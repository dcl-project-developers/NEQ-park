import { MovementType } from './movement'
import { FollowPathMoveComponent, OnFinishPathBehavior } from './pathFollow'
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
