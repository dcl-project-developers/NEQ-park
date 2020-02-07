
import { MoveComponent } from "./components/movement"

// Global update actived move components system
export class UpdateMovementComponentsSystem implements ISystem {
  //Executed ths function on every frame
  update(dt: number) {

    let moveEntities = engine.getComponentGroup(MoveComponent)
    for (let entity of moveEntities.entities) {
      if (entity.getComponent(MoveComponent).movement.bActive) {
          entity.getComponent(MoveComponent).update(dt)
      }
    }
  }
}
