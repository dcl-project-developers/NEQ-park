import { NFTdata } from "./imports/index"
import { TagComponent } from "./imports/index"
var entity16544 = new Entity("Main Camera")
entity16544.addComponent(new TagComponent())
entity16544.getComponent(TagComponent).tag = "MainCamera" 
engine.addEntity(entity16544)
entity16544.addComponent(new Transform({ position: new Vector3(0, 1, -10) }))
entity16544.getComponent(Transform).rotation.set(0, 0, 0, 1)
entity16544.getComponent(Transform).scale.set(1, 1, 1)

var entity16552 = new Entity("Directional Light")
engine.addEntity(entity16552)
entity16552.addComponent(new Transform({ position: new Vector3(0, 3, 0) }))
entity16552.getComponent(Transform).rotation.set(0.4082179, -0.2345697, 0.1093816, 0.8754261)
entity16552.getComponent(Transform).scale.set(1, 1, 1)

var entity10902n = new Entity("GameObject")
entity10902n.addComponent(new NFTdata(entity10902n, "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d", "558536", "NFT TEST", "This is a test")) 
engine.addEntity(entity10902n)
engine.addEntity(entity10902n)
entity10902n.addComponent(new Transform({ position: new Vector3(10.25033, 1.32, 10.14282) }))
entity10902n.getComponent(Transform).rotation.set(0, 0, 0, 1)
entity10902n.getComponent(Transform).scale.set(1, 1, 1)

