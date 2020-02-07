import utils from "../../node_modules/decentraland-ecs-utils/index"
import { MoveComponent, MovementType } from "./components/movement"
import { FollowPathMoveComponent, PathPoint, Path, PathFollower, OnFinishPathBehavior } from "./components/pathFollow"
import { DoorComponent, DoorTriggerBehaviour } from "./components/doors"
import { TrapDoorTrigger, trapDoorTriggersInfo } from "./components/triggers"

export class PathDoor{
    door: DoorComponent
    trigger: TrapDoorTrigger
    bPlayerPassed: Boolean
    bGhostPassed: Boolean
    constructor(door: DoorComponent, trigger: TrapDoorTrigger){
      this.door = door
      this.trigger = trigger
      this.bGhostPassed = false
      this.bPlayerPassed = false
    }
    reset(){
      this.bGhostPassed = false
      this.bPlayerPassed = false
      this.door.openDoor()
    }
}


@Component('Ghost')
export class Ghost{
    pathToFollow: Path
    entity: IEntity
    originalPosition: Vector3
    originalRotation: Quaternion
    originalScale: Vector3
    bActive: boolean
    constructor(pathToFollow: Path, entity: IEntity){
      this.pathToFollow = pathToFollow
      this.entity = entity
      let transform = this.entity.getComponent(Transform)
      this.originalPosition = new Vector3(transform.position.x, transform.position.y, transform.position.z)
      this.originalRotation = new Quaternion(transform.rotation.x, transform.rotation.y, transform.rotation.z, transform.rotation.w)
      this.originalScale = new Vector3(transform.scale.x, transform.scale.y, transform.scale.z)
      this.bActive = false

      let callback = function(){}
      this.entity.addComponent(new FollowPathMoveComponent(MovementType.Simple, pathToFollow.pathPoints, this.entity, pathToFollow.pathGlobalSpeed, false, pathToFollow.onFinish, true, callback))
    }
    startPath(){
      this.bActive = true
      this.entity.getComponent(FollowPathMoveComponent).bActive = true
      this.entity.getComponent(MoveComponent).movement.bOrientAxisToMovement = true
      this.entity.getComponent(FollowPathMoveComponent).moveToNextPoint(this.entity.getComponent(FollowPathMoveComponent))
    }
    emergeFromOrigin(){
      if(this.entity.hasComponent(MoveComponent)){
        let self = this
        this.entity.getComponent(MoveComponent).movement.bActive = false
        this.entity.getComponent(MoveComponent).movement.callback = function(){self.bActive = false}
        this.entity.getComponent(MoveComponent).movement.targetLocation = this.originalPosition
        this.entity.getComponent(MoveComponent).movement.speed = 2
        this.entity.getComponent(MoveComponent).movement.bOrientAxisToMovement = false
        this.entity.getComponent(MoveComponent).movement.bActive = true
      }
      else{
        this.entity.addComponent(new MoveComponent(MovementType.Simple, this.entity.getComponent(Transform).position, this.entity, 1, false, true))
      }

    }
    reset(){
      if(this.entity.hasComponent(FollowPathMoveComponent)){
        this.entity.getComponent(FollowPathMoveComponent).reset(false)
      }
      this.entity.getComponent(Transform).position = this.originalPosition.add(new Vector3(0,-5,0))
      this.entity.getComponent(Transform).rotation = this.originalRotation
      this.entity.getComponent(Transform).scale = this.originalScale
      this.emergeFromOrigin()
      this.bActive = false
    }
    createGhostTrigger(){
      if(!this.entity.hasComponent(utils.TriggerComponent)){
        let self = this
        let triggerBox = new utils.TriggerBoxShape(new Vector3 (1,3,1), new Vector3(0,1,0))
        let trigger = new utils.TriggerComponent(triggerBox, 1, 1,
          null, //onTriggerEnter
          null, //onTriggerExit
          null,  //onCameraEnter
          null //onCameraExits
        )
        this.entity.addComponent(trigger)
      }
    }
}
