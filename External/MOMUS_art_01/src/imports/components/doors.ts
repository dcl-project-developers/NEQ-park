import { MoveComponent, MovementType } from './movement'

export enum DoorTriggerBehaviour {
    Close = 0,
    Open = 1,
    Toggle = 2,
    CloseAndOpen = 2,
}

//Manage movement between openPosition and closedPosition
@Component('DoorComponent')
export class DoorComponent{
    doorEntity: IEntity
    closeSpeed: number  //Movement speed
    waitToClose: number   //Delay between open/close call and movement start
    startClosed: Boolean  //If the door starts in the closedPosition
    closeMoveVector: Vector3 //The relative vector to close
    openPosition: Vector3 //Position when the door is open, sets when constructed with the entity position
    closedPosition: Vector3 //Position when the door is closed, sets when constructed with the entity position+closeMoveVector
    bIsClosed: Boolean
    callback: Function
    bInMovmement: Boolean
    waitTimeout: any
    audioMove: AudioSource
    audioStop: AudioSource
    audioMoveEntity: IEntity
    audioStopEntity: IEntity
    moveComponent: MoveComponent
    constructor(doorEntity: IEntity, closeSpeed: number, waitToClose: number, startClosed: Boolean, closeMoveVector: Vector3, callback: Function = function(){}){
        this.doorEntity = doorEntity
        this.closeSpeed = closeSpeed
        this.waitToClose = waitToClose
        this.startClosed = startClosed
        this.closeMoveVector = closeMoveVector
        this.openPosition = new Vector3(doorEntity.getComponent(Transform).position.x, doorEntity.getComponent(Transform).position.y, doorEntity.getComponent(Transform).position.z)
        this.closedPosition = Vector3.Add(this.openPosition, this.closeMoveVector)
        this.bIsClosed = false
        this.callback = callback
        let self = this
        this.moveComponent = new MoveComponent(MovementType.Simple, this.openPosition, this.doorEntity, this.closeSpeed, false, false, function(){
          //Deactivate and remove MoveComponent from the system update loop, when the movement is finished
          this.bActive = false
          this.entityToMove.removeComponent(MoveComponent)
          self.bInMovmement = false
          self.playAudioStop()
          self.callback()
        })
        //Fixed update speed
        this.moveComponent.movement.dt = 0.016666
        if (startClosed) {
            this.closeDoor(true)
        }
    }
    //Open or close the door with SimpleMoveComponent, bInstant to skip use of movement over time
    toggleDoor(bInstant: boolean = false){
      if (this.bIsClosed) {
        this.openDoor(bInstant)
      }
      else {
        this.closeDoor(bInstant)
      }
    }
    openDoor(bInstant: boolean = false){
      if (this.bIsClosed) {
        if (bInstant) {
            if (this.bInMovmement) {
              this.moveComponent.movement.bActive = false
              this.doorEntity.removeComponent(MoveComponent)
              if (this.waitTimeout) {
                clearTimeout(this.waitTimeout)
              }
            }
            this.doorEntity.getComponent(Transform).position.set(this.openPosition.x, this.openPosition.y, this.openPosition.z)

        }
        else{
          let selfDoor = this
          if (this.bInMovmement) {
            this.moveComponent.movement.bActive = false
            if (this.waitTimeout) {
              clearTimeout(this.waitTimeout)
            }
          }
          this.bInMovmement = true
          this.moveComponent.movement.speed = this.closeSpeed
          this.moveComponent.movement.targetLocation = this.openPosition
          if (this.waitToClose>0) {
            this.waitTimeout = setTimeout(function () {
              if (!selfDoor.doorEntity.hasComponent(MoveComponent)) {
                selfDoor.doorEntity.addComponent(selfDoor.moveComponent)
              }
              selfDoor.playAudioMove()
              selfDoor.moveComponent.movement.bActive = true
            }, this.waitToClose*1000);
          }
          else{
            if (!selfDoor.doorEntity.hasComponent(MoveComponent)) {
              selfDoor.doorEntity.addComponent(selfDoor.moveComponent)
            }
            selfDoor.playAudioMove()
            selfDoor.moveComponent.movement.bActive = true
          }
        }
        this.bIsClosed = false
      }
    }
    closeDoor(bInstant: boolean = false){
      if (!this.bIsClosed) {
        if (bInstant) {
            if (this.bInMovmement) {
              this.moveComponent.movement.bActive = false
              this.doorEntity.removeComponent(MoveComponent)
              if (this.waitTimeout) {
                clearTimeout(this.waitTimeout)
              }
            }
            this.doorEntity.getComponent(Transform).position.set(this.closedPosition.x, this.closedPosition.y, this.closedPosition.z)
        }
        else{
          let selfDoor = this
          if (this.bInMovmement) {
            this.moveComponent.movement.bActive = false
            if (this.waitTimeout) {
              clearTimeout(this.waitTimeout)
            }
          }
          this.bInMovmement = true
          this.moveComponent.movement.speed = this.closeSpeed
          this.moveComponent.movement.targetLocation =  this.closedPosition
          if (this.waitToClose>0) {
            this.waitTimeout = setTimeout(function () {
              if (!selfDoor.doorEntity.hasComponent(MoveComponent)) {
                selfDoor.doorEntity.addComponent(selfDoor.moveComponent)
              }
              selfDoor.playAudioMove()
              selfDoor.moveComponent.movement.bActive = true
            }, this.waitToClose*1000);
          }
          else{
            if (!selfDoor.doorEntity.hasComponent(MoveComponent)) {
              selfDoor.doorEntity.addComponent(selfDoor.moveComponent)
            }
            selfDoor.playAudioMove()
            selfDoor.moveComponent.movement.bActive = true
          }

        }
        this.bIsClosed = true
      }
    }
    setAudio(audioMoveClip: AudioClip, audioStopClip: AudioClip){
      if (!this.audioMoveEntity) {
        this.audioMoveEntity = new Entity()
        this.audioMoveEntity.setParent(this.doorEntity)
      }
      if (!this.audioStopEntity) {
        this.audioStopEntity = new Entity()
        this.audioStopEntity.setParent(this.doorEntity)
      }
      this.audioMove = new AudioSource(audioMoveClip)
      this.audioMove.loop = true
      this.audioMoveEntity.addComponentOrReplace(this.audioMove)

      this.audioStop = new AudioSource(audioStopClip)
      this.audioStop.loop = false
      this.audioStopEntity.addComponentOrReplace(this.audioStop)
    }
    playAudioMove(){
      if (this.audioStop) {
        this.audioStop.playing = false
      }
      if (this.audioMove) {
        this.audioMove.playing = true
      }
    }
    playAudioStop(){
      if (this.audioMove) {
        this.audioMove.playing = false
      }
      if (this.audioStop) {
        this.audioStop.playing = true
      }

    }
}
