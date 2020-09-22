import { TagComponent, MovementType, FollowPathMoveComponent, PathFollower, Path, UpdateMovementComponentsSystem } from "./imports/index"
import { SignPanel,SignBook } from "./signBook"
import { getUserData } from '@decentraland/Identity'
import { getUserAccount } from '@decentraland/EthereumController'

engine.addSystem(new UpdateMovementComponentsSystem())

var pathArray: Path[] = []; //Array of paths to follow

function loadPath() {
  for (const entityId in engine.getEntitiesWithComponent(Path)) {
    if(engine.getEntitiesWithComponent(Path)[entityId].getComponent(Path).pathPoints.length>0){
          pathArray.push(engine.getEntitiesWithComponent(Path)[entityId].getComponent(Path))
    }
  }
}

/*
*   Find and inicialice all PathFollowers & Ghosts
*/
function loadPathFollowers() {
  for (const entityId in engine.getEntitiesWithComponent(PathFollower)) {
    let entity: IEntity = engine.getEntitiesWithComponent(PathFollower)[entityId]


    for (let i = 0; i < pathArray.length; i++) {
        if (pathArray[i].id==entity.getComponent(PathFollower).pathToFollow) {
          if (entity.getComponent(PathFollower).bAutoActivate) {
              entity.addComponent(new FollowPathMoveComponent(MovementType.Simple, pathArray[i].pathPoints, entity, pathArray[i].pathGlobalSpeed, true, pathArray[i].onFinish, true))
              i = pathArray.length
          }
        }
    }
  }
}

/*
*   Load Sign Panel
*/
function loadSignPanel(address:string, name:string) {
  var signPanelsArray: SignPanel[] = []
  for (const entityId in engine.getEntitiesWithComponent(TagComponent)) {
    let entity: IEntity = engine.getEntitiesWithComponent(TagComponent)[entityId]
    if (entity.getComponent(TagComponent).tag=="signpannel") {
      let panelInfo = {
        board: null, next: null, back: null, pages: null
      }
      for (const childid in entity.children) {
        let child = entity.children[childid]
        if (child.hasComponent(TagComponent)) {
          if (child.getComponent(TagComponent).tag=="signpannel_board") {
            panelInfo.board = child
          }
          else if (child.getComponent(TagComponent).tag=="signpannel_next") {
            panelInfo.next = child
          }
          else if (child.getComponent(TagComponent).tag=="signpannel_back") {
            panelInfo.back = child
          }
          else if (child.getComponent(TagComponent).tag=="signpannel_pages") {
            panelInfo.pages = child
          }
        }
      }
      if (panelInfo.board && panelInfo.next && panelInfo.back && panelInfo.pages) {
        var pannel = new SignPanel(entity, panelInfo.board, panelInfo.next, panelInfo.back, panelInfo.pages)
        entity.addComponent(pannel)
        signPanelsArray.push(pannel)
      }
    }
  }
  for (const entityId in engine.getEntitiesWithComponent(TagComponent)) {
    let entity: IEntity = engine.getEntitiesWithComponent(TagComponent)[entityId]
    if (entity.getComponent(TagComponent).tag=="signbook") {
        entity.addComponent(new SignBook(entity, address, name, signPanelsArray))
    }
  }
}

//Load user name/id
executeTask(async () => {
    try {
      const userData = await getUserData()
      const address = await getUserAccount()
      //loadSignPanel(address, userData.displayName)
    } catch (error) {
      log(error.toString())
    }
})

export const loadInit = function(){
  /*loadPath()
  loadPathFollowers()*/
}
loadInit()
