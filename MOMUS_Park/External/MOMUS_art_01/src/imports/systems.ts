import { TagComponent } from "./components/components"
import { MoveComponent } from "./components/movement"
import { WidgetTextTimmer } from "./widgets"

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

// Global update actived move components system
export class UpdateTimerWidgetSystem implements ISystem {
  timerWidget: WidgetTextTimmer
  //Executed ths function on every frame
  update() {
    if (this.timerWidget && this.timerWidget.container.visible) {
      this.timerWidget.update()
    }
  }
}

// Global update actived move components system
export class UpdateToPlayerSystem implements ISystem {
  entities: IEntity[]
  //Executed ths function on every frame
  update() {
    for (let index = 0; index < this.entities.length; index++) {
      if (this.entities[index].hasComponent(Transform)) {
        let position = Camera.instance.position
        if (this.entities[index].hasComponent(TagComponent) && this.entities[index].getComponent(TagComponent).tag=="ambience") {
          this.entities[index].getComponent(Transform).position = new Vector3(40,position.y,-25)
        }
        else{
          this.entities[index].getComponent(Transform).position = position
        }
      }
    }
  }
}
