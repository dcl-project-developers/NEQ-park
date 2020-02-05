import { TagComponent, Path, PathFollower, DoorComponent, TrapDoorTrigger, trapDoorTriggersInfo } from "./imports/index"


var entity946318 = new Entity("Main Camera")
entity946318.addComponent(new TagComponent())
entity946318.getComponent(TagComponent).tag = "MainCamera" 
engine.addEntity(entity946318)
entity946318.addComponent(new Transform({ position: new Vector3(0, 1, -10) }))
entity946318.getComponent(Transform).rotation.set(0, 0, 0, 1)
entity946318.getComponent(Transform).scale.set(1, 1, 1)

var entity828776 = new Entity("Grass_01_a_Art")
engine.addEntity(entity828776)
entity828776.addComponent(new Transform({ position: new Vector3(3.583543, 0, 11.02375) }))
entity828776.getComponent(Transform).rotation.set(0, 0, 0, 1)
entity828776.getComponent(Transform).scale.set(1, 1, 1)
entity828776.addComponent(new GLTFShape("unity_assets/entity828776.gltf"))
entity828776.getComponent(Transform).rotation.set(0, 1, 0, -4.371139E-08)
var entity944076 = new Entity("GameObject")
engine.addEntity(entity944076)
entity944076.addComponent(new Transform({ position: new Vector3(44.99321, -98.39829, 43.02855) }))
entity944076.getComponent(Transform).rotation.set(0, 0, 0, 1)
entity944076.getComponent(Transform).scale.set(1, 1, 1)

var entity943454 = new Entity("Directional Light")
engine.addEntity(entity943454)
entity943454.addComponent(new Transform({ position: new Vector3(0, 3, 0) }))
entity943454.getComponent(Transform).rotation.set(0.4082179, -0.2345697, 0.1093816, 0.8754261)
entity943454.getComponent(Transform).scale.set(1, 1, 1)

