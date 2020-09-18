export class Text{
  text: {en: string}
  comfirmText?: {en: string, fontSize?: number}
  cancelText?: {en: string, fontSize?: number}
  fontSize: number
  vAlign: string
  nextTextIndex?: number
  bIsComfirmText?: boolean = false
  comfirmTextIndex?: number
  cancelTextIndex?: number
  comfirmFunction?: Function
  cancelFunction?: Function
  callback?: Function
  bEndDialog?: boolean = false
}
export class Dialog{
  texts: Text[]
}
export const textDialogs: Dialog[] = [
    {
      texts:[
        {
          text: {
            en: "Welcome!",
          },
          fontSize: 36,
          vAlign: "0%",
        },
        {
          text: {
            en: "Feeling lucky today? I have a little challenge for you",
          },
          fontSize: 36,
          vAlign: "0%",
        },
        {
          text: {
            en: "Test your skills in the VIKING CHALLENGE!",
          },
          fontSize: 36,
          vAlign: "0%",
        },
        {
          text: {
            en: "Hit the target with your axes, hold the mouse button to throw them with strenght.",
          },
          fontSize: 36,
          vAlign: "0%",
        },
        {
          text: {
            en: "But it would require some MANA you know.",
          },
          fontSize: 36,
          vAlign: "0%",
          comfirmText: {
            en: "E: 10 MANA",
            fontSize: 19,
          },
          cancelText: {
            en: "F: No way",
            fontSize: 20,
          },
          bIsComfirmText: true,
          comfirmTextIndex: -1,
          cancelTextIndex: 5,
          bEndDialog: true
        },
        {
          text: {
            en: "No??? Well, not everyone have the skill to beat the viking challenge.",
          },
          fontSize: 28,
          vAlign: "0%",
          bEndDialog: true
        },
      ]
    },
    {
      texts:[
        {
          text: {
            en: "Will you face a true challenge for godlike skills? Or just the one for normal warriors?",
          },
          fontSize: 26,
          vAlign: "0%",
          comfirmText: {
            en: "E: Normal",
            fontSize: 19,
          },
          cancelText: {
            en: "F: Hard",
            fontSize: 20,
          },
          bIsComfirmText: true,
          comfirmTextIndex: 1,
          cancelTextIndex: 1,
        },
        {
          text: {
            en: "Great, prove to me that you have the skills of a viking",
          },
          fontSize: 36,
          vAlign: "0%",
        },
        {
          text: {
            en: "Get ready the targets will start appearing soon.",
          },
          fontSize: 26,
          vAlign: "0%",
          bEndDialog: true
        },
      ]
    },
    //In chase taunts
    {
      texts:[
        {
          text: {
            en: "C'mon C'mon",
          },
          fontSize: 36,
          vAlign: "0%",
          bEndDialog: true
        },
        {
          text: {
            en: "Speed up!",
          },
          fontSize: 36,
          vAlign: "0%",
          bEndDialog: true
        },
        {
          text: {
            en: "IEEEEEEEEEE!",
          },
          fontSize: 36,
          vAlign: "0%",
          bEndDialog: true
        },
        {
          text: {
            en: "Don't get lost!",
          },
          fontSize: 36,
          vAlign: "0%",
        },
      ]
    },
    //Finish texts
    //Lost
    {
      texts:[
        {
          text: {
            en: "Hey I think you are lost, let's meet at the entrance.",
          },
          fontSize: 36,
          vAlign: "0%",
        },
        {
          text: {
            en: "Whaaaaaaaat, be more careful next time.",
          },
          fontSize: 36,
          vAlign: "0%",
        },
        {
          text: {
            en: "You're not the first person lost in here.",
          },
          fontSize: 36,
          vAlign: "0%",
        },
      ]
    },
    //Finish game
    {
      texts:[
        {
          text: {
            en: "Not bad",
          },
          fontSize: 36,
          vAlign: "0%",
        },
        {
          text: {
            en: "I'll write your score in the hall of warriors",
          },
          fontSize: 36,
          vAlign: "0%",
        },
        {
          text: {
            en: "Maybe next time you can improve it.",
          },
          fontSize: 36,
          vAlign: "0%",
        },
      ]
    },
    //Random NPCs talk
    {
      texts:[
        {
          text: {
            en: "I don't want to talk to you",
          },
          fontSize: 40,
          vAlign: "0%",
        },
        {
          text: {
            en: "You think you can do better than me'?!",
          },
          fontSize: 40,
          vAlign: "0%",
        },
        {
          text: {
            en: "..... no",
          },
          fontSize: 40,
          vAlign: "0%",
        },
        {
          text: {
            en: "Hello, and bye",
          },
          fontSize: 40,
          vAlign: "0%",
        },
        {
          text: {
            en: "I was a Tomb Chaser like you, now I'm dead",
          },
          fontSize: 40,
          vAlign: "0%",
        },
        {
          text: {
            en: "............  ....?",
          },
          fontSize: 40,
          vAlign: "0%",
        },
        {
          text: {
            en: "I heard a polygonal mind created this place, whatever that is.",
          },
          fontSize: 36,
          vAlign: "0%",
        },
        {
          text: {
            en: "If you're here for the treasure, just forget it.",
          },
          fontSize: 40,
          vAlign: "0%",
        },
        {
          text: {
            en: "My wife was right, my hobby was dangerous.....",
          },
          fontSize: 40,
          vAlign: "0%",
        },
        {
          text: {
            en: "HAHAHAHA you're trying to get the treasure???? HAHAHAHA",
          },
          fontSize: 36,
          vAlign: "0%",
        },
        {
          text: {
            en: "wot",
          },
          fontSize: 40,
          vAlign: "0%",
        },
        {
          text: {
            en: "nope",
          },
          fontSize: 40,
          vAlign: "0%",
        },
        {
          text: {
            en: "Stop",
          },
          fontSize: 40,
          vAlign: "0%",
        },
      ]
    },
    //Mana payment error
    {
      texts:[
        {
          text: {
            en: "It seems that there is a problem with you MANA payment",
          },
          fontSize: 36,
          vAlign: "0%",
        },
        {
          text: {
            en: "Check if your metamask account it's ready",
          },
          fontSize: 40,
          vAlign: "0%",
          bEndDialog: true
        },
      ]
    },
]

export function getTextData(dialogId:number, textId:number): Text{
  if (textDialogs[dialogId]) {
    if (textDialogs[dialogId].texts[textId]) {
      return textDialogs[dialogId].texts[textId];
    }
    else return null;
  }
  else return null;

}

export function getText(dialogId:number, textId:number, textLanguage:string): string{
  if (textDialogs[dialogId]) {
    if (textDialogs[dialogId].texts[textId]) {
      if (!textDialogs[dialogId].texts[textId].text[textLanguage]) {
        textLanguage = 'en'
      }
      return textDialogs[dialogId].texts[textId].text[textLanguage];
    }
    else return "";
  }
  else return "";

}
