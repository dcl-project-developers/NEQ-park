import { MoveComponent, MovementType } from "./components/movement"

var textPoolArray:FloatingText[]  = []

export class FloatingText {
  bInUse: boolean
  entity: IEntity
  text: TextShape
  moveComponent: MoveComponent
  constructor() {
    this.entity = new Entity()
    this.text = new TextShape("Hello World!")
    this.text.visible = false
    this.text.fontSize = 5
    this.entity.addComponent(new Transform({position: new Vector3(1,0,1)}))
    this.entity.addComponent(this.text)
    this.moveComponent = new MoveComponent(MovementType.Simple, new Vector3(0,0,0), this.entity, 1, false, false)
    this.entity.addComponent(this.moveComponent)

    /*self.moveComponent.movement.update = function(dt:number){
      self.moveComponent.movement.update(dt)
      self.update(dt)
    }*/
  }
  activate(position: Vector3, text: string, color: Color3){
    this.entity.getComponent(Transform).position = position
    this.entity.getComponent(Transform).rotation = Quaternion.LookRotation(directionVectorBetweenTwoPoints(Camera.instance.position, position), Vector3.Up())

    this.text.value = text
    this.text.color = color
    this.text.opacity = 1
    this.text.visible = true

    this.moveComponent.movement.targetLocation = Vector3.Add(position, new Vector3(0,2,0))
    engine.addEntity(this.entity)
    this.moveComponent.activate()
    //this.opacityAnim()
    var self = this
    setTimeout(function() {
      self.deactivate()
    }, 1000);
  }
  deactivate(){
    this.text.visible = false
    engine.removeEntity(this.entity)
    this.bInUse = false
  }
  opacityAnim(alpha:float = 0){
    this.text.opacity = 0.2
    if (alpha<1) {
      var self = this
      setTimeout(() => {
        self.opacityAnim(alpha+0.05)
      }, 25);

    }
  }
}

export function requestFloatingText(): FloatingText{
  for (let i = 0; i < textPoolArray.length; i++) {
    if (textPoolArray[i] && !textPoolArray[i].bInUse) {
      textPoolArray[i].bInUse = true
      return textPoolArray[i]
    }
  }

  var newText = new FloatingText()
  newText.bInUse = true
  textPoolArray.push(newText)
  return newText;
}
