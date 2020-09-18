import { getUserData } from '@decentraland/Identity'
import { getUserAccount } from '@decentraland/EthereumController'

import { TagComponent } from './imports/index'
import { SignPanel, SignBook } from "./signBook"


var address: string
var userName: string

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

function loadStreaming(streamingURL: string) {

    const myVideoClip = new VideoClip(streamingURL)
    const myVideoTexture = new VideoTexture(myVideoClip)

    const myMaterial = new BasicMaterial()
    myMaterial.texture = myVideoTexture

    for (const entityId in engine.getEntitiesWithComponent(TagComponent)) {
      let entity: IEntity = engine.getEntitiesWithComponent(TagComponent)[entityId]
      if (entity.getComponent(TagComponent).tag=="streaming_board") {
        const screen = new Entity()
        screen.addComponent(new PlaneShape())
        screen.addComponent(new Transform({  position: new Vector3(0, 0, -0.8), scale: new Vector3(0.9,,0.9,0.9)}))
        screen.addComponent(myMaterial)
        screen.addComponent(new OnPointerDown(() => {
            myVideoTexture.playing = !myVideoTexture.playing
        }))
        screen.setParent(entity)
      }
    }

    myVideoTexture.playing = true


}

function loadUserData() {
  //Load user name/id
  executeTask(async () => {
      try {
        if (!address) {
          address = await getUserAccount()
          if (address) {
            address = address.toLowerCase()
          }
        }
        if (!userName) {
          const userData = await getUserData()
          userName = userData.displayName
        }
        loadSignPanel(address, userName)
      } catch (error) {
        log(error.toString())
      }
  })
}

function loadInit() {
  loadUserData()
  loadStreaming("https://video.dcl.guru/live/dclcoretv/index.m3u8")
}
loadInit()
