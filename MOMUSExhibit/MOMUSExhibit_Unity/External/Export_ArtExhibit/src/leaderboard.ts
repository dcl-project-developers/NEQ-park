
const LIMIT = 10

type scoreInfo = {
  nScores: number,
  page: number,
  nPages: number,
  scores: any[],
  bPendingRequest: boolean,
}

var requestInfo: scoreInfo = {
  nScores: 0,
  page: 0,
  nPages: 1,
  bPendingRequest: false,
  scores: [],
}

function leaderboardRequest(page: number, callback = function(){}){
  if (requestInfo.bPendingRequest==false) {
    requestInfo.bPendingRequest = true
    requestInfo.page = page
    executeTask(async () => {
      try {
        let response = await fetch("https://lowpolyhub.com:3000/api/leaderboard/tombchaserLeaderboard/1?skip="+requestInfo.page*LIMIT+"&limit="+LIMIT, {
          headers: { "Content-Type": "application/json" },
          method: "GET"
        })
        let json = await response.json()
        if (json.status && json.status=="success") {
          requestInfo.nScores = json.result.totalScores
          requestInfo.scores = json.result.scores
          requestInfo.nPages = Math.ceil(requestInfo.nScores/LIMIT)
          requestInfo.bPendingRequest = false
          callback()
          updateLeaderboards()
          log(requestInfo);
        }
        else{
          log(json.error);

          throw new Error(json.error)
        }

      } catch (e){
        requestInfo.bPendingRequest = false
        log("failed to reach URL")
        log(e);
      }
    })
  }
}

export function sendScoreRequest(address:string, name:string, score: number, callback = function(){}){
    executeTask(async () => {
      try {
        let response = await fetch("https://lowpolyhub.com:3000/api/leaderboard/tombchaserLeaderboard/1?address="+address+"&name="+name+"&score="+score, {
          headers: { "Content-Type": "application/json" },
          method: "POST"
        })
        let json = await response.json()
        if (json.status && json.status=="success") {
          console.log(json);
          callback()
          leaderboardRequest(requestInfo.page)
        }
        else{
          throw new Error(json.error)
        }

      } catch (e){
        log("failed to reach URL")
        console.log(e);
      }
    })
}

var leaderboardsEntities: [{
  entity: IEntity
  textPositionEntity: IEntity
  textNameEntity: IEntity
  textPointsEntity: IEntity
  textPageEntity: IEntity
  textPosition: TextShape
  textName: TextShape
  textPoints: TextShape
  textPage: TextShape
}]

@Component("Leaderboard")
export class Leaderboard {
  entity: IEntity
  entityNext: IEntity
  entityBack: IEntity
  constructor(entity: IEntity, entityNext: IEntity, entityBack: IEntity) {
    this.entity = entity
    this.entityNext = entityNext
    this.entityBack = entityBack
    const textTitleEntity = new Entity()
    const textTitle = new TextShape("LEADERBOARD")
    textTitleEntity.addComponent(textTitle)

    textTitleEntity.addComponent(new Transform({
      position: new Vector3(0,1,-0.01),
      rotation: Quaternion.Euler(0,0,0),
      scale: new Vector3(0.8,0.8,0.8)
    }))
    textTitle.color = new Color3(0,0,0)
    textTitle.fontSize = 3
    textTitle.lineSpacing = "0px"
    textTitle.hTextAlign = "center"
    textTitle.vTextAlign = "top"
    textTitleEntity.setParent(entity)

    const textPositionEntity = new Entity()
    const textPosition = new TextShape("")
    textPositionEntity.addComponent(textPosition)

    textPositionEntity.addComponent(new Transform({
      position: new Vector3(-1.1,0.7,-0.01),
      rotation: Quaternion.Euler(0,0,0),
      scale: new Vector3(0.65,0.65,0.65)
    }))
    textPosition.color = new Color3(0,0,0)
    textPosition.fontSize = 2
    textPosition.lineSpacing = "-5px"
    textPosition.hTextAlign = "right"
    textPosition.vTextAlign = "top"
    textPositionEntity.setParent(entity)

    const textNameEntity = new Entity()
    const textName = new TextShape("")
    textNameEntity.addComponent(textName)

    textNameEntity.addComponent(new Transform({
      position: new Vector3(0,0.7,-0.01),
      rotation: Quaternion.Euler(0,0,0),
      scale: new Vector3(0.65,0.65,0.65)
    }))
    textNameEntity.setParent(entity)
    textName.color = new Color3(0,0,0)
    textName.fontSize = 2
    textName.lineSpacing = "-5px"
    textName.hTextAlign = "center"
    textName.vTextAlign = "top"

    const textPointsEntity = new Entity()
    const textPoints = new TextShape("")
    textPointsEntity.addComponent(textPoints)

    textPointsEntity.addComponent(new Transform({
      position: new Vector3(1,0.7,-0.01),
      rotation: Quaternion.Euler(0,0,0),
      scale: new Vector3(0.65,0.65,0.65)
    }))
    textPointsEntity.setParent(entity)
    textPoints.color = new Color3(0,0,0)
    textPoints.fontSize = 2
    textPoints.lineSpacing = "-5px"
    textPoints.hTextAlign = "left"
    textPoints.vTextAlign = "top"

    const textPageEntity = new Entity()
    const textPage = new TextShape("/")
    textPageEntity.addComponent(textPage)

    textPageEntity.addComponent(new Transform({
      position: new Vector3(0,-0.91,-0.01),
      rotation: Quaternion.Euler(0,0,0),
      scale: new Vector3(0.7,0.7,0.7)
    }))
    textPageEntity.setParent(entity)
    textPage.color = new Color3(0,0,0)
    textPage.fontSize = 2
    textPage.hTextAlign = "center"
    textPage.vTextAlign = "bottom"
    var self = this
    entityNext.addComponent(new OnPointerDown(
      e => {
        self.nextPage()
      },
      {
        button: ActionButton.PRIMARY,
        hoverText: "Next page",
        distance: 5
      }
    ))

    entityBack.addComponent(new OnPointerDown(
      e => {
        self.previousPage()
      },
      {
        button: ActionButton.PRIMARY,
        hoverText: "Previous page",
        distance: 5
      }
    ))
    if (entityBack.hasComponent(GLTFShape)) {
      entityBack.getComponent(GLTFShape).visible = false
      entityBack.getComponent(GLTFShape).withCollisions = false
    }

    if (leaderboardsEntities) {
      leaderboardsEntities.push({
        entity: entity,
        textPositionEntity: textPositionEntity,
        textNameEntity: textNameEntity,
        textPointsEntity: textPointsEntity,
        textPageEntity: textPageEntity,
        textPosition: textPosition,
        textName: textName,
        textPoints: textPoints,
        textPage: textPage
      })
    }
    else {
      leaderboardsEntities = [{
        entity: entity,
        textPositionEntity: textPositionEntity,
        textNameEntity: textNameEntity,
        textPointsEntity: textPointsEntity,
        textPageEntity: textPageEntity,
        textPosition: textPosition,
        textName: textName,
        textPoints: textPoints,
        textPage: textPage,
      }]
    }
    leaderboardRequest(0)
  }
  nextPage(){
    if (requestInfo.page+1<requestInfo.nPages) {
      leaderboardRequest(requestInfo.page+1)
      if (this.entityBack.hasComponent(GLTFShape)) {
        this.entityBack.getComponent(GLTFShape).visible = true
        this.entityBack.getComponent(GLTFShape).withCollisions = true
      }
      if (requestInfo.page+1>=requestInfo.nPages) {
        if (this.entityNext.hasComponent(GLTFShape)) {
          this.entityNext.getComponent(GLTFShape).visible = false
          this.entityNext.getComponent(GLTFShape).withCollisions = false
        }
      }
    }

  }
  previousPage(){
    if (requestInfo.page-1>=0) {
      leaderboardRequest(requestInfo.page-1)
      if (this.entityNext.hasComponent(GLTFShape)) {
        this.entityNext.getComponent(GLTFShape).visible = true
        this.entityNext.getComponent(GLTFShape).withCollisions = true
      }
      if (requestInfo.page-1<0) {
        if (this.entityBack.hasComponent(GLTFShape)) {
          this.entityBack.getComponent(GLTFShape).visible = false
          this.entityBack.getComponent(GLTFShape).withCollisions = false
        }
      }
    }
  }

}
function updateLeaderboards(){
  for (let index = 0; index < leaderboardsEntities.length; index++) {
    const leaderboard = leaderboardsEntities[index];
    leaderboard.textPosition.value = ""
    leaderboard.textName.value = ""
    leaderboard.textPoints.value = ""
    leaderboard.textPosition.lineSpacing = "-5px"
    leaderboard.textPosition.fontSize = 2

    leaderboard.textPage.value = (requestInfo.page+1)+"/"+requestInfo.nPages
    for (let i = 0; i < requestInfo.scores.length; i++) {
      leaderboard.textPosition.value += (requestInfo.page*LIMIT+i+1) + ".\n"
      if (requestInfo.scores[i].name) {
        leaderboard.textName.value += (requestInfo.scores[i].name) + "\n"
      }
      else {leaderboard.textName.value += "guest" + "\n"}

      leaderboard.textPoints.value += (millisToMillisAndSeconds(Math.abs(requestInfo.scores[i].score)) + "\n"

    }
  }
}
