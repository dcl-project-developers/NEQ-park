
@Component('TagComponent')
export class TagComponent{
    tag: string
}

export class Elevator{
  entity: IEntity
  state: number
  animClip: AnimationState
  bAllowEnter: boolean
  constructor(entity: IEntity){
    let animator = new Animator()
    let clipElevator = new AnimationState(entity.name)
    animator.addClip(clipElevator)
    entity.addComponent(animator)
    clipElevator.looping = false
    clipElevator.stop()
    this.entity = entity
    this.state = 0
    this.animClip = clipElevator
    this.bAllowEnter = true
  }
  up(){
    if (this.bAllowEnter && this.state==0) {
        this.animClip.reset()
        this.animClip.play()
        this.bAllowEnter = false
        this.state=1
        let self = this
        setTimeout(() => {
          self.finishUp()
        }, 11*1000);
    }
  }
  down(){
    if (this.bAllowEnter && this.state==1) {
        this.bAllowEnter = false
        this.animClip.speed = 1
        this.state=0
        let self = this
        setTimeout(() => {
          self.finishDown()
        }, 14*1000);
    }
  }
  finishUp(){
    if (!this.bAllowEnter && this.state==1) {
      this.bAllowEnter = true
      this.animClip.speed = 0
    }
  }
  finishDown(){
    if (!this.bAllowEnter && this.state==0) {
      this.bAllowEnter = true
    }
  }
}

@Component('ElevatorButton')
export class ElevatorButton{
  entity: IEntity
  elevatorName: string
  elevator: Elevator
  floor: number
  constructor(entity: IEntity, floor: number, elevatorName: string){
    this.entity = entity
    this.floor = floor
    this.elevatorName = elevatorName
    let self = this
    entity.addComponent(
      new OnPointerDown(e => {
        self.call()
      })
    )
  }
  call(){
    if (this.floor==0) {
        this.elevator.down()
    }
    else if (this.floor==1) {
        this.elevator.up()
    }
  }
}
