import { TagComponent, Path, PathFollower, DoorComponent, TrapDoorTrigger, trapDoorTriggersInfo } from "./imports/index"


var entity130974 = new Entity("Main Camera")
entity130974.addComponent(new TagComponent())
entity130974.getComponent(TagComponent).tag = "MainCamera" 
engine.addEntity(entity130974)
entity130974.addComponent(new Transform({ position: new Vector3(0, 1, -10) }))
entity130974.getComponent(Transform).rotation.set(0, 0, 0, 1)
entity130974.getComponent(Transform).scale.set(1, 1, 1)

var entity146188 = new Entity("mesh_animatied_deer_walkpath_01")
engine.addEntity(entity146188)
entity146188.addComponent(new Transform({ position: new Vector3(9.781094, 0.45858, 7.050335) }))
entity146188.getComponent(Transform).rotation.set(0, -0.9912183, 0, -0.1322358)
entity146188.getComponent(Transform).scale.set(1, 1, 1)

var entity146194 = new Entity("mesh_animated_deer_walk")
entity146194.setParent(entity146188)
entity146194.addComponent(new Transform({ position: new Vector3(-0.0001679659, 0, 0.8653062) }))
entity146194.getComponent(Transform).rotation.set(0, 0, 0, 1)
entity146194.getComponent(Transform).scale.set(1, 1, 1)
entity146194.addComponent(new GLTFShape("unity_assets/entity146194.gltf"))
entity146194.getComponent(Transform).rotation.set(0, 1, 0, -4.371139E-08)
var entity130982 = new Entity("Directional Light")
engine.addEntity(entity130982)
entity130982.addComponent(new Transform({ position: new Vector3(0, 3, 0) }))
entity130982.getComponent(Transform).rotation.set(0.4082179, -0.2345697, 0.1093816, 0.8754261)
entity130982.getComponent(Transform).scale.set(1, 1, 1)

