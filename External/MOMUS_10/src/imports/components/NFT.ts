
@Component('NFTdata')
export class NFTdata{
  entity: IEntity
  smartContract: string
  tokenId: string
  constructor(entity: IEntity, smartContract, tokenId){
    this.entity = entity
    this.smartContract = smartContract
    this.tokenId = tokenId
    const shapeComponent = new NFTShape('ethereum://'+smartContract+'/'+tokenId,Color3.Blue())
    entity.addComponent(shapeComponent)
  }
}
