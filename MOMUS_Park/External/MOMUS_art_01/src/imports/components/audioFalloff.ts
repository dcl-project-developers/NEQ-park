
//Simple movement component, updated by system when active, calls a callback when reach a minimun distance to targetLocation
@Component('AudioFalloff')
export class AudioFalloff{
  entity: IEntity
  audio: AudioSource
  maxRadius: float
  minRadius: float
  maxVolume: float
  minVolume: float
  bActive: boolean
  constructor(entity: IEntity, audio: AudioSource, maxRadius: float, minRadius: float, bStartActive: boolean, minVolume: float = 0, maxVolume: float = 1, bDebug: boolean = false){
    this.entity = entity
    this.audio = audio
    this.maxRadius = maxRadius
    this.minRadius = minRadius
    this.maxVolume = maxVolume
    this.minVolume = minVolume
    this.bActive = bStartActive
    if (bDebug) {
      const debugEntity = new Entity()
      debugEntity.addComponent(new SphereShape())
      const debugMaterial = new Material()
      debugMaterial.albedoColor = new Color4(1,0,0,0.3)
      debugEntity.addComponent(debugMaterial)
      debugEntity.getComponent(SphereShape).withCollisions = false
      debugEntity.addComponent(new Transform({position: new Vector3(0,0,0), scale: new Vector3(this.maxRadius,this.maxRadius,this.maxRadius)}))
      debugEntity.setParent(this.entity)

      const debugEntity1 = new Entity()
      debugEntity1.addComponent(new SphereShape())
      const debugMaterial1 = new Material()
      debugMaterial1.albedoColor = new Color4(0,0,1,0.3)
      debugEntity1.addComponent(debugMaterial1)
      debugEntity1.getComponent(SphereShape).withCollisions = false
      debugEntity1.addComponent(new Transform({position: new Vector3(0,0,0), scale: new Vector3(this.minRadius,this.minRadius,this.minRadius)}))
      debugEntity1.setParent(this.entity)
    }
  }
  update() {
    if (this.bActive && this.audio) {
      if (this.entity.hasComponent(Transform)) {
        const distance = Vector3.Distance(this.entity.getComponent(Transform).position, Camera.instance.position)
        var volume = 0
        if (distance>this.maxRadius) {
          volume = 0
        }
        else if(distance<this.minRadius){
          volume = 1
        }
        else{
          volume = lerp(this.minVolume, this.maxVolume, 1-((distance-this.minRadius)/(this.maxRadius-this.minRadius)))
        }
        this.audio.audioClip.data.volume = volume
      }
    }
  }

}
