
export enum MovementType {
   Simple = 0,
   Aceleration = 1,
}

interface IMovement{
  bActive: Boolean    //Activate the component to update
  targetLocation: Vector3   //The position to reach
  targetRotation: Quaternion   //The rotation to reach
  targetScale: Vector3   //The scale to reach
  entityToMove: IEntity
  speed: float   //Movement speed * frame time
  bOrientAxisToMovement: Boolean    //Orient the entityToMove rotation to the direction of the movement
  dt: float
  callback: Function   //Callback to call when targetLocation is reached
  update(dt: number): void
  activate(): void
  deactivate(): void
  setSpeed(speed: float): void
}

//Simple movement component, updated by system when active, calls a callback when reach a minimun distance to targetLocation
class SimpleMove implements IMovement{
  bActive: Boolean    //Activate the component to update
  targetLocation: Vector3   //The position to reach
  targetRotation: Quaternion   //The rotation to reach
  targetScale: Vector3   //The scale to reach
  entityToMove: IEntity
  speed: float   //Movement speed * frame time
  bOrientAxisToMovement: Boolean    //Orient the entityToMove rotation to the direction of the movement
  dt: float
  callback: Function   //Callback to call when targetLocation is reached

  constructor(targetLocation: Vector3, entityToMove: IEntity, speed: number, bOrientAxisToMovement: Boolean, bActive: Boolean, callback=function(){}){
      this.bActive = bActive
      this.targetLocation = targetLocation
      this.entityToMove = entityToMove
      this.speed = speed
      this.bOrientAxisToMovement = bOrientAxisToMovement
      this.callback = callback
      this.dt = 0
  }
  activate(speed: float = -1){
    if (speed>=0) {
      this.speed = speed
    }
    this.bActive = true
  }
  deactivate(){
    this.bActive = false
  }
  setSpeed(speed: number){
    this.speed = speed
  }
  //Update called in the system update loop
  update(dt: number) {
    if (this.bActive) {
      if (this.dt>0 && this.dt<dt) {
        dt = this.dt
      }
      let transform = this.entityToMove.getComponent(Transform)
      let distance = directionVectorBetweenTwoPoints(transform.position, this.targetLocation).scale(dt*this.speed)
      if (this.bOrientAxisToMovement) {
          transform.lookAt(new Vector3(this.targetLocation.x, transform.position.y, this.targetLocation.z))
      }
      transform.translate(distance)
      if (Vector3.Distance(transform.position, this.targetLocation)<=distance.length()) {
          this.bActive = false
          this.callback()
      }
    }
  }
}

class AcelerateMove extends SimpleMove{
  maxSpeed: float
  speedAlpha: float
  acceleration: float
  deceleration: float
  brakingDistance: float
  constructor(targetLocation: Vector3, entityToMove: IEntity, speed: number, bOrientAxisToMovement: Boolean, bActive: Boolean, callback=function(){}){
      super(targetLocation, entityToMove, speed, bOrientAxisToMovement, bActive, callback)
      this.maxSpeed = speed
      this.speed = 0
      this.speedAlpha = 0
      this.acceleration = 0.01
      this.deceleration = 0.5
  }
  setSpeed(speed: float){
    this.maxSpeed = speed
    this.brakingDistance = (0 - (this.maxSpeed^2))/(this.deceleration*-4)
  }
  activate(speed: float = -1){
    if (speed>=0) {
      this.setSpeed(speed)
    }
    this.bActive = true
    this.speedAlpha = 0
    this.speed = 0
  }
  deactivate(){
    this.bActive = false
    this.speedAlpha = 0
    this.speed = 0
  }
  //Update called in the system update loop
  update(dt: number) {
    if (this.bActive) {
      if (this.dt>0) {
        dt = this.dt
      }
      let transform = this.entityToMove.getComponent(Transform)
      this.speed = lerp(0, this.maxSpeed, this.speedAlpha)
      if (this.speedAlpha<=0) {
        this.speed = 1
      }
      let distance = directionVectorBetweenTwoPoints(transform.position, this.targetLocation).scale(dt*this.speed)
      if (this.bOrientAxisToMovement) {
          transform.lookAt(new Vector3(this.targetLocation.x, transform.position.y, this.targetLocation.z))
      }
      transform.translate(distance)
      if (Vector3.Distance(transform.position, this.targetLocation)<=distance.length()) {
          this.bActive = false
          this.callback()
      }
      else{

        let distance = Vector3.Distance(transform.position, this.targetLocation)
        if (distance<=this.brakingDistance) {
          if (this.speedAlpha>0) {
            this.speedAlpha = distance/this.brakingDistance
          }
          if (this.speedAlpha<0.01) {
            this.speedAlpha = 0.01
          }

        }
        else if (this.speedAlpha<1) {
          this.speedAlpha = this.speedAlpha+0.01
          if (this.speedAlpha>1) {
            this.speedAlpha = 1
          }
        }
      }
    }
  }
}

//Simple movement component, updated by system when active, calls a callback when reach a minimun distance to targetLocation
@Component('MoveComponent')
export class MoveComponent{
  movement: SimpleMove
  constructor(movementType: MovementType,targetLocation: Vector3, entityToMove: IEntity, speed: number, bOrientAxisToMovement: Boolean, bActive: Boolean, callback=function(){}){
      switch (movementType) {
        case MovementType.Simple:
          this.movement = new SimpleMove(targetLocation, entityToMove, speed, bOrientAxisToMovement, bActive, callback)
          break;
        case MovementType.Aceleration:
          this.movement = new AcelerateMove(targetLocation, entityToMove, speed, bOrientAxisToMovement, bActive, callback)
          break;
        default:
          this.movement = new SimpleMove(targetLocation, entityToMove, speed, bOrientAxisToMovement, bActive, callback)
          break;
      }
  }
  //Update called in the system update loop
  update(dt: number) {
    this.movement.update(dt)
  }
  activate(speed: float = -1){
    this.movement.activate(speed)
  }
  deactivate(){
    this.movement.deactivate()
  }
  setSpeed(speed: float){
    this.movement.setSpeed(speed)
  }
}
