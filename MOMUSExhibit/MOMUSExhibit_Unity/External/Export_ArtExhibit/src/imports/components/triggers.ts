import utils from "../../../node_modules/decentraland-ecs-utils/index"
import {DoorComponent, DoorTriggerBehaviour} from './doors'

export var trapDoorTriggersInfo: TrapDoorTrigger[] = []
export var triggersInfo: Trigger[] = []
export class Trigger{
  triggerPosition: Vector3
  triggerSize: Vector3
  tags: string[]
  bDebug: boolean
  constructor(position: Vector3, size: Vector3, tags: string[]){
      this.triggerPosition = position
      this.triggerSize = size
      this.tags = tags
      this.bDebug = false
  }
  createTrigger(){
    let triggerBox = new utils.TriggerBoxShape(this.triggerSize, new Vector3(0,0,0))
    //create trigger for entity
    let trigger = new utils.TriggerComponent(
       triggerBox, //shape
       0, //layer
       0, //triggeredByLayer
       null, //onTriggerEnter
       null, //onTriggerExit
       null,  //onCameraEnter
       null //onCameraExits
    )

    const triggerEntity = new Entity()
    triggerEntity.addComponent(new Transform({ position: this.triggerPosition}))
    triggerEntity.addComponent(trigger)
    engine.addEntity(triggerEntity)
    if (this.bDebug) {
      //Debug
      const debugEntity = new Entity()
      debugEntity.addComponent(new Transform({ position: this.triggerPosition , scale: this.triggerSize}))
      debugEntity.addComponent(new BoxShape())
      debugEntity.getComponent(BoxShape).withCollisions = false
      const myDebugMaterial = new Material()
      myDebugMaterial.albedoColor = new Color4(1, 0, 0, 0.2)
      debugEntity.addComponent(myDebugMaterial)
      engine.addEntity(debugEntity)
    }
    return trigger;
  }
}

export class TrapDoorTrigger{
  triggerPosition: Vector3
  triggerSize: Vector3
  doorEnititiesNames: string[]
  doorEnitities: DoorComponent[]
  bDebug: boolean
  doorBehaviour: DoorTriggerBehaviour
  constructor(position: Vector3, size: Vector3, doorBehaviour: DoorTriggerBehaviour, doorEnititiesNames: string[]){
      this.triggerPosition = position
      this.triggerSize = size
      this.doorEnititiesNames = doorEnititiesNames
      this.doorBehaviour = doorBehaviour
      this.bDebug = false
      this.doorEnitities = []
  }
  createTrigger(){
    if (this.doorEnitities.length==0) {
      for (const entityId in engine.getEntitiesWithComponent(DoorComponent)) {
        let entity: IEntity = engine.getEntitiesWithComponent(DoorComponent)[entityId]
        if (this.doorEnititiesNames.indexOf(entity.name) != -1) {
            this.doorEnitities.push(entity.getComponent(DoorComponent))
        }
      }
    }
    let triggerBox = new utils.TriggerBoxShape(this.triggerSize, new Vector3(0,0,0))
    //create trigger for entity
    let trigger = new utils.TriggerComponent(
       triggerBox, //shape
       0, //layer
       0, //triggeredByLayer
       null, //onTriggerEnter
       null, //onTriggerExit
       null,  //onCameraEnter
       null //onCameraExits
    )

    const triggerEntity = new Entity()
    triggerEntity.addComponent(new Transform({ position: this.triggerPosition}))
    triggerEntity.addComponent(trigger)
    engine.addEntity(triggerEntity)
    if (this.bDebug) {
      //Debug
      const debugEntity = new Entity()
      debugEntity.addComponent(new Transform({ position: this.triggerPosition , scale: this.triggerSize}))
      debugEntity.addComponent(new BoxShape())
      debugEntity.getComponent(BoxShape).withCollisions = false
      const myDebugMaterial = new Material()
      myDebugMaterial.albedoColor = new Color4(1, 0, 0, 0.2)
      debugEntity.addComponent(myDebugMaterial)
      engine.addEntity(debugEntity)
    }
    return trigger;
  }
}
