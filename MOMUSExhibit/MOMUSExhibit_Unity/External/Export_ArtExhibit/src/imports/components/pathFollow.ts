import { MoveComponent, MovementType } from './movement'

export enum OnFinishPathBehavior {
    Stop = 0,
    Loop = 1,
    Reverse = 2,
}

export class PathPoint{
  position: Vector3
  speed: number //Speed to get to this point, ovewrite globalSpeed
  wait: number //Seconds to wait in the point before continue to the next
  constructor(position: Vector3, speed: number, wait: number){
      this.position = position
      this.speed = speed
      this.wait = wait
  }
}

@Component('Path')
export class Path{
    id: any
    pathPoints: PathPoint[]
    onFinish: OnFinishPathBehavior
    pathGlobalSpeed: number
    constructor(id: any, pathPoints: any[], pathGlobalSpeed: number, onFinish: OnFinishPathBehavior){
        this.id = id
        this.pathPoints = pathPoints
        this.onFinish = onFinish
        this.pathGlobalSpeed = pathGlobalSpeed
    }
}
@Component('PathFollower')
export class PathFollower{
    bAutoActivate: boolean  //Start following path on load
    pathToFollow: string    //path name
    constructor(pathToFollow: string, bAutoActivate: boolean){
        this.pathToFollow = pathToFollow
        this.bAutoActivate = bAutoActivate
    }
}


/*
Follow a array of path points targetPoints[Vector3], when reach the next point goes to the next in the array, uses MoveComponent
calls a callback when reach last point and stops
*/
@Component('FollowPathMoveComponent')
export class FollowPathMoveComponent{
  bActive: Boolean  //Start active
  targetPoints: PathPoint[] //Array of points to go
  targetPointIndex: number  //Index of the current point to go
  entityToMove: IEntity   //Entity to move
  globalSpeed: number   //Movement speed if the current PathPoint doesn't ovewrite it
  callback: Function   //Callback to call when last PathPoint is reached and finishBehavior is Stop
  moveComponent: MoveComponent
  bOrientAxisToMovement: Boolean    //Orient the entityToMove rotation to the direction of the movement
  finishBehavior: OnFinishPathBehavior    //The type of behaviour to do when last PathPoint is reached
  timeout: any //Makes the ghost resume its movement if it's waiting for the player, as soon as the player hits a trigger.
  cancelNextWait: boolean
  constructor(movementType: MovementType, targetPoints: PathPoint[], entityToMove: IEntity, globalSpeed: number, bActive: Boolean, finishBehavior: OnFinishPathBehavior, bOrientAxisToMovement: Boolean, callback=function(){}){
      this.bActive = bActive
      this.targetPoints = targetPoints
      this.entityToMove = entityToMove
      this.callback = callback
      this.globalSpeed = globalSpeed
      this.finishBehavior = finishBehavior
      this.bOrientAxisToMovement = bOrientAxisToMovement
      this.targetPointIndex = 0
      this.timeout = null

      if (entityToMove.hasComponent(MoveComponent)) {
          this.moveComponent = entityToMove.getComponent(MoveComponent)
      }
      else{
        let speed = this.globalSpeed
        if (targetPoints[0].speed>0) {
            speed = targetPoints[0].speed
        }
        entityToMove.addComponent(new MoveComponent(movementType, targetPoints[0].position, entityToMove, speed, bOrientAxisToMovement, false, callback))
        this.moveComponent = entityToMove.getComponent(MoveComponent)
      }

      if (this.bActive) {
        this.moveToNextPoint(this)
      }
  }
  reset(reactivate: boolean = false){
    this.bActive = false
    this.moveComponent.deactivate()
    this.targetPointIndex = 0
    if (reactivate) {
      this.bActive = true
      this.moveToNextPoint(this)
    }
  }

  cancelTimeout(bCancelNext: boolean = false){
    if(this.timeout != null)
    {
      clearTimeout(this.timeout)
      this.moveToNextPoint()
      this.timeout = null
    }
    else this.cancelNextWait = bCancelNext
  }

  //Activate MoveComponent to move to targetPointIndex and +1 targetPointIndex
  moveToNextPoint(self:FollowPathMoveComponent=null) {
    if(!self && this.entityToMove && this.entityToMove.hasComponent(FollowPathMoveComponent)){
      self = this.entityToMove.getComponent(FollowPathMoveComponent)
    }
    if (self) {
        //Si ha terminado el path
        if (self.targetPoints.length<=self.targetPointIndex) {
            //Loop the path, following to the 0 point
            if (self.finishBehavior==OnFinishPathBehavior.Loop) {
                self.targetPointIndex = 0
            }
            //Reverse the array of path_points and follow to the new 0 point
            else if (self.finishBehavior==OnFinishPathBehavior.Reverse) {
              self.targetPoints = self.targetPoints.reverse();
              if (self.targetPoints.length>1) {
                  self.targetPointIndex = 1
              }
            }
        }

        if (self.targetPoints.length>self.targetPointIndex) {
            if (self.targetPoints[self.targetPointIndex].wait) {
              let waitTime = self.targetPoints[self.targetPointIndex].wait*1000
              if (self.cancelNextWait) {
                self.cancelNextWait = false
                waitTime = 10
              }
              self.moveComponent.movement.callback = function(){
                self.timeout = setTimeout(function(){
                  self.moveToNextPoint()
                }, waitTime);
              }
            }
            else{
              self.moveComponent.movement.callback = self.moveToNextPoint
            }
            self.moveComponent.movement.targetLocation = self.targetPoints[self.targetPointIndex].position

            if (self.targetPoints[self.targetPointIndex].speed>0) {
                self.moveComponent.setSpeed(self.targetPoints[self.targetPointIndex].speed)
                self.moveComponent.activate()
            }
            else {
                self.moveComponent.setSpeed(self.globalSpeed)
                self.moveComponent.activate()
            }
            self.bActive = true
            self.moveComponent.movement.bActive = true
            self.targetPointIndex = self.targetPointIndex + 1
        }
        else {
          self.bActive = false
          self.callback()
        }
    }
  }
}
