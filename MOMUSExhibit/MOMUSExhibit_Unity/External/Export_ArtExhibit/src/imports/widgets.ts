import { Text, Dialog, textDialogs, getTextData, getText} from '../jsonData/textsData'
import { UpdateTimerWidgetSystem } from './systems'

export enum SkipMode {
    Click = 0,
    Auto = 1,
    AutoAndClick = 2,
}

class ImageProperties{
  texture: Texture
  sourceWidth: number
  sourceHeight: number
  width: number | string
  height: number | string
}

export class TextProperties{
  dialogId: number
  textId: number
  textLanguage?: string = "en"
}

export class Widget{
  parentUI: UIShape
  parentWidget: Widget
  childrenWidget: Widget[] = []
  container: UIShape
  bVisibleWithParent: boolean = true
  showForTimeTimeout: any
  constructor(parentUI: Widget | UIShape, container: UIShape = null){
    if (parentUI as Widget) {
      this.parentWidget = parentUI as Widget
      this.parentUI = (parentUI as Widget).container
    }
    else if(parentUI as UIShape){
      this.parentUI = (parentUI as UIShape)
      this.parentWidget = null
    }

    if (container==null) {
      this.container = new UIContainerStack(this.parentUI)
      this.container.visible = false
      this.container.vAlign = 'center'
      this.container.hAlign = 'center'
      this.container.width = '100%'
      this.container.height = '100%'
    }
    else{
      this.container = container
    }
  }
  //Muestra u oculta el widget y sus hijos, no muestra los hijos que no tengan bVisibleWithParent==true
  show(bVisible: boolean){
    this.container.visible = bVisible
    for (let index = 0; index < this.childrenWidget.length; index++) {
      if (this.childrenWidget[index].bVisibleWithParent || !bVisible) {
        this.childrenWidget[index].show(bVisible);
      }
    }
  }
  //Show durante showTime segundos
  showForTime(bVisible: boolean, showTime: float){
    if (this.showForTimeTimeout) {
      clearTimeout(this.showForTimeTimeout)
      this.showForTimeTimeout = null
    }
    this.show(bVisible)
    if (showTime>0) {
      let self = this
      this.showForTimeTimeout = setTimeout(() => {
        self.show(!bVisible)
      }, showTime*1000);
    }
  }
}

export class WidgetTextTimmer extends Widget{
  textUI: UIText
  startTime: number
  updateSystem: UpdateTimerWidgetSystem
  timeout: any
  bUpdate: boolean
  constructor(parentUI: Widget | UIShape){
    var parent: UIShape;
    if (parentUI as Widget) {
      parent = (parentUI as Widget).container
    }
    else if(parentUI as UIShape){
      parent = (parentUI as UIShape)
    }

    var container = new UIContainerRect(parent)
    container.visible = false
    container.vAlign = 'top'
    container.hAlign = 'center'
    container.width = '100%'
    container.height = '20%'
    //container.color = Color4.Gray()

    super(parentUI, container)
    this.textUI = new UIText(container)
    this.textUI.vAlign = "top"
    this.textUI.value = '00:00'
    this.textUI.fontSize = 36
    this.textUI.color = Color4.White()

  }
  show(bVisible: boolean){
    if (!bVisible) {
      this.start(false)
    }
    super.show(bVisible)
  }
  start(bStart: boolean){
    if (bStart) {
      this.startTime = Date.now()
      this.bUpdate = true
      this.update()
      /*if (!this.updateSystem) {
        this.updateSystem = new UpdateTimerWidgetSystem()
        this.updateSystem.timerWidget = this
      }
      engine.addSystem(this.updateSystem)*/
    }
    else{
      this.bUpdate = false
      if(this.timeout){
        clearTimeout(this.timeout)
      }
    }
    /*else if(this.updateSystem){
      engine.removeSystem(this.updateSystem)
    }*/
  }
  update(){
    this.textUI.value = millisToMinutesAndSeconds(Date.now() - this.startTime)
    let self = this
    this.timeout = setTimeout(() => {
      if (self.bUpdate && self.container.visible) {
        self.update()
      }
    }, 1000);
  }
}

export class WidgetTextBox extends Widget{
  textBoxImage: UIImage
  faceImage: UIImage
  textUI: UIText
  textData: TextProperties
  timeoutNextChar: any
  bWritingText: boolean
  wgTextControlls: Widget
  nAllowDelayText: boolean
  constructor(parentUI: Widget | UIShape, textData: TextProperties = null){
    var parent: UIShape;
    if (parentUI as Widget) {
      parent = (parentUI as Widget).container
    }
    else if(parentUI as UIShape){
      parent = (parentUI as UIShape)
    }
    var container = new UIContainerRect(parent)
    container.visible = false
    container.vAlign = 'bottom'
    container.hAlign = 'center'
    container.width = '100%'
    container.height = '25%'
    container.positionY = "2%"
    //container.color = Color4.Gray()
    super(parentUI, container)

    this.textBoxImage = new UIImage(container, new Texture('assets/panel-large.png'))
    this.textBoxImage.name = 'textBoxImage'
    this.textBoxImage.sourceWidth = 2012,
    this.textBoxImage.sourceHeight = 2354,
    this.textBoxImage.width = '50%',
    this.textBoxImage.height = '100%',
    this.textBoxImage.vAlign = 'bottom'
    this.textBoxImage.hAlign = 'center'

    this.faceImage = new UIImage(container, new Texture("assets/GhostFace.png"))
    this.faceImage.name = 'faceImage'
    this.faceImage.sourceWidth = 512
    this.faceImage.sourceHeight = 512
    this.faceImage.width = 512*0.35+'px'
    this.faceImage.height = 512*0.35+'px'
    this.faceImage.vAlign = 'center'
    this.faceImage.hAlign = 'center'
    this.faceImage.positionX = "-30%"

    this.textUI = new UIText(this.textBoxImage)
    this.textUI.value = ''
    this.textUI.color = Color4.Black()

    this.textData = textData
    this.nAllowDelayText = true
  }
  show(bVisible: boolean){
    if (this.timeoutNextChar) {
      this.bWritingText = false
      clearTimeout(this.timeoutNextChar)
      this.timeoutNextChar = null
    }
    if (bVisible && this.textData && textDialogs[this.textData.dialogId].texts[this.textData.textId]) {
      this.setText(this.textData)
    }
    super.show(bVisible)
  }
  setText(text: TextProperties, bWithDelay: boolean = true){
      if (this.timeoutNextChar) {
        this.bWritingText = false
        clearTimeout(this.timeoutNextChar)
        this.timeoutNextChar = null
      }

      this.textUI.fontSize = getTextData(text.dialogId, text.textId).fontSize
      this.textUI.color = Color4.Black()
      this.textUI.vAlign = 'center'
      this.textUI.hAlign = 'left'
      this.textUI.positionX = "3%"
      this.textUI.positionY = getTextData(text.dialogId, text.textId).vAlign
      this.textUI.width = '95%'
      this.textUI.textWrapping = true
      this.textUI.adaptHeight = true
      if (bWithDelay && this.nAllowDelayText) {
        this.setTextWithDelay(getText(text.dialogId, text.textId, text.textLanguage))
      }
      else{
        this.textUI.value = getText(text.dialogId, text.textId, text.textLanguage)
      }
  }
  setTextWithDelay(finalText: string, currentText: string = ""){
      if (currentText.length<finalText.length) {
        this.bWritingText = true
        currentText = currentText + finalText.charAt(currentText.length)
        this.textUI.value = currentText
        let self = this
        this.timeoutNextChar = setTimeout(() => {
          self.setTextWithDelay(finalText, currentText)
        }, 20);
      }
      else { this.bWritingText = false }

  }

}
export class WidgetComfirm extends Widget{
  buttonComfirmImage: UIImage
  buttonCancelImage: UIImage
  comfrimTextUI: UIText
  cancelTextUI: UIText
  comfirmFunction: Function
  inputComfirmUnsubscribe: any
  inputCancelUnsubscribe: any
  cancelFunction: Function
  comfirmDialog: TextProperties[]
  cancelDialog: TextProperties[]
  inputInstance: Input
  constructor(parentUI: Widget | UIShape){
    var parent: UIShape;
    if (parentUI as Widget) {
      parent = (parentUI as Widget).container
    }
    else if(parentUI as UIShape){
      parent = (parentUI as UIShape)
    }
    var container = new UIContainerRect(parent)
    container.visible = false
    container.vAlign = 'bottom'
    container.hAlign = 'center'
    container.width = '50%'
    container.height = '35%'
    container.positionY = "2%"
    //container.color = Color4.Gray()
    super(parentUI, container)

    this.buttonComfirmImage = new UIImage(container, new Texture("assets/button-C-blue.png"))
    this.buttonComfirmImage.name = 'buttonComfirmImage'
    this.buttonComfirmImage.sourceWidth = 855
    this.buttonComfirmImage.sourceHeight = 313
    this.buttonComfirmImage.width = "15%"
    this.buttonComfirmImage.height = "60%"
    this.buttonComfirmImage.vAlign = 'center'
    this.buttonComfirmImage.hAlign = 'left'
    this.buttonComfirmImage.positionX = "20%"

    this.comfrimTextUI = new UIText(this.buttonComfirmImage)
    this.comfrimTextUI.value = 'E:   YES'
    this.comfrimTextUI.vAlign = 'center'
    this.comfrimTextUI.hAlign = 'center'
    this.comfrimTextUI.color = Color4.Black()
    this.comfrimTextUI.fontSize = 28
    this.comfrimTextUI.width = "100%"
    this.comfrimTextUI.hTextAlign = 'center'
    this.comfrimTextUI.vTextAlign = 'center'
    this.comfrimTextUI.positionY = "5%"

    this.buttonCancelImage = new UIImage(container, new Texture("assets/button-C-pink.png"))
    this.buttonCancelImage.name = 'buttonCancelImage'
    this.buttonCancelImage.sourceWidth = 855
    this.buttonCancelImage.sourceHeight = 313
    this.buttonCancelImage.width = "15%"
    this.buttonCancelImage.height = "60%"
    this.buttonCancelImage.vAlign = 'center'
    this.buttonCancelImage.hAlign = 'right'
    this.buttonCancelImage.positionX = "-20%"

    this.cancelTextUI = new UIText(this.buttonCancelImage)
    this.cancelTextUI.value = 'F:   NO'
    this.cancelTextUI.vAlign = 'center'
    this.cancelTextUI.hAlign = 'center'
    this.cancelTextUI.color = Color4.Black()
    this.cancelTextUI.fontSize = 28
    this.cancelTextUI.width = "100%"
    this.cancelTextUI.hTextAlign = 'center'
    this.cancelTextUI.vTextAlign = 'center'
    this.cancelTextUI.positionY = "5%"

    this.inputInstance = Input.instance
  }
  show(bVisible: boolean){
    if (bVisible) {
      let self = this
      self.unsubscribeInputs()
      self.inputComfirmUnsubscribe = this.inputInstance.subscribe("BUTTON_DOWN", ActionButton.PRIMARY, false, e => {
        if(self.container.visible){
          self.show(false)
          self.comfirmFunction()
          self.unsubscribeInputs()
        }

      })

      self.inputCancelUnsubscribe = this.inputInstance.subscribe("BUTTON_DOWN", ActionButton.SECONDARY, false, e => {
        if(self.container.visible){
          self.show(false)
          self.cancelFunction()
          self.unsubscribeInputs()
        }
      })
    }
    else{
      this.unsubscribeInputs()
    }
    super.show(bVisible)
  }
  unsubscribeInputs(){
    if (this.inputComfirmUnsubscribe) {
      this.inputComfirmUnsubscribe()

    }
    if (this.inputCancelUnsubscribe) {
      this.inputCancelUnsubscribe()

    }
  }

}

export class WidgetTalk extends WidgetTextBox{
  dialogIndex: number
  dialogData: Dialog
  index: number
  timeToNext: float
  skipMode: SkipMode
  bHideWhenEnded: boolean
  callback: Function
  private timeoutNextText: any
  private inputInstance: Input
  private inputUnsubscribe: Function
  comfirmWg: WidgetComfirm
  constructor(parentUI: Widget | UIShape, dialogIndex: number, bHideWhenEnded: boolean, skipMode: SkipMode, callback = function(){}){
    super(parentUI)

    this.dialogIndex = dialogIndex
    this.skipMode = skipMode
    this.bHideWhenEnded = bHideWhenEnded
    this.dialogData = textDialogs[this.dialogIndex]
    this.callback = callback

    this.textData = {
      dialogId: dialogIndex,
      textId: -1
    }
  }
  show(bVisible: boolean){
    if (this.timeoutNextText) {
      clearTimeout(this.timeoutNextText)
      this.timeoutNextText = null
    }
    if (bVisible) {
      this.dialogData = textDialogs[this.dialogIndex]
      if (this.skipMode==SkipMode.Click || this.skipMode==SkipMode.AutoAndClick) {
        //Skip with click
        this.setClickEvent()
      }
      if (this.isAutoSkip()){
        //Skip when finish text after 4s
        this.timeToNext = 4
      }
    }
    else{
      if (this.inputUnsubscribe) {
        this.inputUnsubscribe()
        this.inputUnsubscribe = null
      }
      if (this.comfirmWg && this.comfirmWg.container.visible) {
        this.comfirmWg.show(false)
      }
    }
    if (bVisible) {
      this.textData.textId = -1
    }
    super.show(bVisible)
    if (bVisible) {
      this.showNextText()
    }
  }
  showNextText(){
    const text = getTextData(this.textData.dialogId, this.textData.textId)
    if (text && text.callback) {
      text.callback()
    }
    if (getTextData(this.textData.dialogId, this.textData.textId+1)
      && (!text || !text.bEndDialog)
    ) {
      this.textData.textId = this.textData.textId+1
      this.setText(this.textData)
    }
    else{
      this.callback()
      if(this.bHideWhenEnded){
        this.show(false)
      }
    }

  }
  setText(textData: TextProperties, bWithDelay: boolean = true){
      if (getTextData(this.dialogIndex, this.textData.textId).bIsComfirmText) {
        this.setComfirmText(this.textData)
      }
      super.setText(textData, bWithDelay)
      if (!bWithDelay) {
        this.setNextAutoSkip()
        this.lastTextMessage()
      }
  }
  setTextWithDelay(finalText: string, currentText: string = ""){
      super.setTextWithDelay(finalText, currentText)
      if (currentText.length>=finalText.length) {
        this.bWritingText = false
        clearTimeout(this.timeoutNextChar)
        this.timeoutNextChar = null
        this.setNextAutoSkip()
        this.lastTextMessage()
      }

  }
  isAutoSkip(){
      return this.skipMode==SkipMode.Auto || this.skipMode==SkipMode.AutoAndClick
  }
  private setNextAutoSkip(){
    if (this.isAutoSkip()) {
      clearTimeout(this.timeoutNextText)
      let self = this
      this.timeoutNextText = setTimeout(() => {
        self.showNextText()
      }, this.timeToNext*1000);
    }
  }
  private setClickEvent(){
    //Skip with click
    let self = this
    if (!self.inputInstance) {
      self.inputInstance = Input.instance
      const container = new UIContainerRect(self.textBoxImage)
      container.visible = false
      container.vAlign = 'bottom'
      container.hAlign = 'right'
      container.positionX = "-2%"
      container.positionY = "3%"

      let controlsWg = new Widget(self, container)

      const controlsText = new UIText(container)
      controlsText.value = ': Next'
      controlsText.color = Color4.Black()
      controlsText.hTextAlign = 'right'
      controlsText.vTextAlign = 'center'
      controlsText.fontSize = 16

      let controlsTextWg = new Widget(controlsWg, controlsText)

      const clickImage = new UIImage(container, new Texture("assets/mouse-left-click_black.png"))
      clickImage.name = 'faceImage'
      clickImage.sourceWidth = 100
      clickImage.sourceHeight = 100
      clickImage.width = '23%'
      clickImage.height = '50%'
      clickImage.vAlign = 'center'
      clickImage.hAlign = 'center'
      clickImage.positionX = "-3%"

      let controlsImgWg = new Widget(controlsWg, clickImage)

      controlsWg.childrenWidget = [controlsTextWg, controlsImgWg]
      self.childrenWidget.push(controlsWg)
      self.wgTextControlls = controlsWg
      controlsWg.show(true)
    }
    self.inputUnsubscribe = self.inputInstance.subscribe("BUTTON_DOWN", ActionButton.POINTER, false, e => {
      if (self.bWritingText) {
        self.bWritingText = false
        clearTimeout(self.timeoutNextChar)
        self.timeoutNextChar = null
        self.setText(self.textData, false)
      }
      else if(!getTextData(self.textData.dialogId, self.textData.textId).bIsComfirmText){
        self.showNextText()
      }
    })
  }
  private lastTextMessage(){

    if (getTextData(this.textData.dialogId, this.textData.textId)
      && (getTextData(this.textData.dialogId, this.textData.textId).bEndDialog || getTextData(this.textData.dialogId, this.textData.textId).bIsComfirmText)
    ) {
      if ((this.bHideWhenEnded && this.wgTextControlls.childrenWidget[0].container as UIText) && !getTextData(this.textData.dialogId, this.textData.textId).bIsComfirmText) {
        (this.wgTextControlls.childrenWidget[0].container as UIText).value = ": Close"
        this.wgTextControlls.show(true)
      }
      else{
        this.wgTextControlls.show(false)
      }
    }
    else{
      (this.wgTextControlls.childrenWidget[0].container as UIText).value = ": Next"
      this.wgTextControlls.show(true)
    }
  }
  setComfirmText(textData: TextProperties){
    if (!this.comfirmWg) {
      this.comfirmWg = new WidgetComfirm(this)
      this.comfirmWg.bVisibleWithParent = false
      this.childrenWidget.push(this.comfirmWg)
    }

    let self = this
    let text = getTextData(textData.dialogId, textData.textId)
    if (text.comfirmText) {
      self.comfirmWg.comfrimTextUI.value = text.comfirmText.en
      if (text.comfirmText.fontSize) {
        self.comfirmWg.comfrimTextUI.fontSize = text.comfirmText.fontSize
      }
    }
    else{
      self.comfirmWg.comfrimTextUI.value = 'E:   YES'
      self.comfirmWg.comfrimTextUI.fontSize = 20
    }
    if (text.cancelText) {
      self.comfirmWg.cancelTextUI.value = text.cancelText.en
      if (text.cancelText.fontSize) {
        self.comfirmWg.cancelTextUI.fontSize = text.cancelText.fontSize
      }
    }
    else{
      self.comfirmWg.cancelTextUI.value = 'F:   NO'
      self.comfirmWg.cancelTextUI.fontSize = 20
    }

    self.comfirmWg.comfirmFunction = function(){
      if (text.comfirmFunction) {
        text.comfirmFunction()
      }

      self.comfirmWg.unsubscribeInputs()
      if (text.comfirmTextIndex>0) {
        self.textData.textId = text.comfirmTextIndex
        self.setText(self.textData)
      }

    }
    self.comfirmWg.cancelFunction = function(){
      if (text.cancelFunction) {
        text.cancelFunction()
      }
      self.comfirmWg.unsubscribeInputs()
      if (text.cancelTextIndex>0) {
        self.textData.textId = text.cancelTextIndex
        self.setText(self.textData)
      }
    }

    this.comfirmWg.show(true)
  }
}
