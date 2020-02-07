import { TagComponent, Path, PathFollower, DoorComponent, TrapDoorTrigger, trapDoorTriggersInfo } from "./imports/index"


var entity105752 = new Entity("Main Camera")
entity105752.addComponent(new TagComponent())
entity105752.getComponent(TagComponent).tag = "MainCamera" 
engine.addEntity(entity105752)
entity105752.addComponent(new Transform({ position: new Vector3(0, 1, -10) }))
entity105752.getComponent(Transform).rotation.set(0, 0, 0, 1)
entity105752.getComponent(Transform).scale.set(1, 1, 1)

var entity105760 = new Entity("Directional Light")
engine.addEntity(entity105760)
entity105760.addComponent(new Transform({ position: new Vector3(0, 3, 0) }))
entity105760.getComponent(Transform).rotation.set(0.4082179, -0.2345697, 0.1093816, 0.8754261)
entity105760.getComponent(Transform).scale.set(1, 1, 1)

