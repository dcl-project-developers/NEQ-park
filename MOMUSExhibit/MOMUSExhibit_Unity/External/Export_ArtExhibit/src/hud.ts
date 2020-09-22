import { Widget, WidgetTalk, SkipMode, setWidgetNFT, getWidgetNFT, WidgetNFT } from "./imports/index"
import { textDialogs} from './jsonData/textsData'

class WidgetRobot extends WidgetTalk{
  show(bVisible: boolean){
    super.show(bVisible)
    if (!bVisible) {
      this.callback()
    }
  }
}

export function getHUD(){
    return hud
}

export class HUD_ABM {
  canvas: UICanvas
  widgets: Widget[]
  wgTalkRobot: WidgetRobot
  wgNFT: WidgetNFT
  constructor(){
    this.canvas = new UICanvas()
    this.canvas.visible = true
    this.wgTalkRobot = new WidgetRobot(this.canvas, 1, true, SkipMode.Click)
    this.wgTalkRobot.faceImage.visible = false
    setWidgetNFT(this.canvas)
    this.wgNFT = getWidgetNFT()
    this.widgets = [this.wgTalkRobot, this.wgNFT]

  }
  setRobotDialogIndex(newIndex: number){
    this.wgTalkRobot.dialogIndex = newIndex
    this.wgTalkRobot.dialogData = textDialogs[newIndex]
    this.wgTalkRobot.textData = {
      dialogId: newIndex,
      textId: -1
    }
  }
  showWidgetIndex(index: number, hideOthers:boolean, showForTime: number=0){
    if (hideOthers) {
      this.hideAll()
    }
    if (this.widgets[index]) {
      if(showForTime>0){
        this.widgets[index].showForTime(true, showForTime)
      }
      else {this.widgets[index].show(true)}
    }

  }
  hideWidgetIndex(index: number){
    if (this.widgets[index] && this.widgets[index].container.visible) {
      this.widgets[index].show(false);
    }
  }
  hideAll(){
    for (let i = 0; i < this.widgets.length; i++) {
      this.hideWidgetIndex(i)
    }
  }
}

var hud: HUD_ABM = new HUD_ABM()
