import { MovementType } from './movement'
import { FollowPathMoveComponent, OnFinishPathBehavior } from './pathFollow'
import utils from "../../../node_modules/decentraland-ecs-utils/index"
import { TriggerComponent } from '../../../node_modules/decentraland-ecs-utils/triggers/triggerSystem'
//Manage movement between openPosition and closedPosition

@Component('PlatformComponent')
export class PlatformComponent{
    entity: IEntity
    moveSpeed: number
    waitToStart: number
    startPosition: Vector3
    postionMove1: Vector3
    postionMove2: Vector3
    fallPointY: number
    movePath: FollowPathMoveComponent
    constructor(entity: IEntity, moveSpeed: number, balanceDistance: number, waitToStart: number, fallPointY: number){
      this.entity = entity
      this.moveSpeed = moveSpeed
      let position = this.entity.getComponent(Transform).position
      this.startPosition = new Vector3(position.x, position.y, position.z)
      this.postionMove1 = this.startPosition.add(new Vector3(0,balanceDistance,0))
      this.postionMove2 = this.startPosition.add(new Vector3(0,balanceDistance*-1,0))
      this.waitToStart = waitToStart
      this.fallPointY = fallPointY
      this.movePath = new FollowPathMoveComponent(
        MovementType.Simple,
        [{position: this.startPosition, speed:-1, wait:0}, {position: this.postionMove1, speed:-1, wait:0}, {position: this.postionMove2, speed:-1, wait:0}],
        this.entity,
        moveSpeed,
        false,
        OnFinishPathBehavior.Loop,
        false
      )
      this.movePath.moveComponent.movement.dt = 0.0166666
      this.entity.addComponent(this.movePath)
    }
    start(){
      if (this.waitToStart>0) {
        setTimeout(() => {
          this.movePath.bActive = true
          this.movePath.moveComponent.movement.speed = this.moveSpeed
          this.movePath.moveToNextPoint(this.movePath)
        }, this.waitToStart*1000);
      }
      else{
        this.movePath.bActive = true
        this.movePath.moveComponent.movement.speed = this.moveSpeed
        this.movePath.moveToNextPoint(this.movePath)
      }
    }
    stop(){
      this.movePath.reset()
    }
    reset(){
      this.stop()
      this.entity.getComponent(Transform).position = new Vector3(this.startPosition.x, this.startPosition.y, this.startPosition.z)
      if (this.entity.hasComponent(GLTFShape)) {
        this.entity.getComponent(GLTFShape).withCollisions = true
        this.entity.getComponent(GLTFShape).visible = true
      }
    }
    fall(){
      this.stop()
      if (this.entity.hasComponent(GLTFShape)) {
        var gtlfShape = this.entity.getComponent(GLTFShape)
        gtlfShape.withCollisions = false
        setTimeout(() => {
          gtlfShape.visible = false
        }, 1000);
      }
      this.movePath.moveComponent.movement.speed = 10
      this.movePath.moveComponent.movement.callback = function(){}
      this.movePath.moveComponent.movement.targetLocation = new Vector3(this.startPosition.x, this.fallPointY, this.startPosition.z)
      this.movePath.moveComponent.activate()
    }

}

//A platform with two end positions: Moves towards the "target" when player steps inside trigger and remains there if reached until player steps out.
//Then, it goes back towards the starting position with a different speed.
@Component('TriggeredPlatformComponent')
export class TriggeredPlatformComponent{
  entity: IEntity
  activeSpeed: number
  retreatingSpeed: number
  moveSpeed: number
  waitToStart: number
  startPosition: Vector3
  endPosition: Vector3
  movePath: FollowPathMoveComponent
  bPlayerIn: boolean

  constructor(entity: IEntity, activeSpeed: number, retreatingSpeed:number, endPosition: Vector3, waitToStart: number){
    this.entity = entity
    this.activeSpeed = activeSpeed
    this.retreatingSpeed = retreatingSpeed
    this.moveSpeed = activeSpeed
    let position = this.entity.getComponent(Transform).position.clone()
    this.startPosition = new Vector3(position.x, position.y, position.z)
    this.endPosition = endPosition
    this.waitToStart = waitToStart
    this.movePath = new FollowPathMoveComponent(
      MovementType.Simple,
      [{position: this.startPosition, speed:-1, wait:0}, {position: this.endPosition, speed:-1, wait:0}],
      this.entity,
      this.moveSpeed,
      false,
      OnFinishPathBehavior.Stop,//The idea here is to have the platform stopped until the onCameraExit is triggered
      false
    )
    this.movePath.moveComponent.movement.dt = 0.0166666
    this.entity.addComponent(this.movePath)

    //Trigger--------------------------------------------------------------------
    //let entityScale = this.entity.getComponent(Transform).scale
    let triggerSize = new Vector3(4.5,3,4.5)//This might need some tweaking as 'scale' vector might not accurately represent the model's real dimensions.
    //let triggerPos = entity.getComponent(Transform).position.add(new Vector3(0, triggerSize.y/2, 0))


    let triggerBox = new utils.TriggerBoxShape(triggerSize, new Vector3(0,1.5,0))
    let fallTrigger = new utils.TriggerComponent(
     triggerBox, //shape
     0, //layer
     0, //triggeredByLayer
     null, //onTriggerEnter
     null, //onTriggerExit
     null,  //onCameraEnter
     null //onCameraExits
    )
    this.entity.addComponent(fallTrigger)

    /*const debug = new Entity()
    debug.addComponent(new BoxShape())
    debug.addComponent(new Transform({position: new Vector3(0,1.5,0), scale: triggerSize}))
    debug.getComponent(BoxShape).withCollisions = false
    debug.addComponent(new Material())
    debug.getComponent(Material).albedoColor = new Color4(0.5,0,0,0.5)
    debug.setParent(this.entity)*/

    var self = this
    function camEnter(){
      self.bPlayerIn = true
      if (self.waitToStart>0) {
        setTimeout(() => {
          self.move()
        }, self.waitToStart*1000);
      }
      else{
        self.move()
      }
    }

    function camExit(){
      self.bPlayerIn = false
      self.moveToOrigin()
    }

    this.entity.getComponent(TriggerComponent).onCameraEnter = camEnter
    this.entity.getComponent(TriggerComponent).onCameraExit = camExit
  }
  moveToOrigin(){
    /*What i think this does is return to the targetPoint 0 in the path with some interpolation.
    I don't really know, though. But that's the intention.*/
    this.movePath.moveComponent.movement.speed = this.retreatingSpeed
    this.movePath.reset(true)
  }
  move(){
    this.movePath.bActive = true
    this.movePath.moveComponent.movement.speed = this.activeSpeed
    this.movePath.moveToNextPoint(this.movePath)
  }



}
