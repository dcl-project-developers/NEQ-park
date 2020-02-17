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
            en: "Welcome Traveler!",
          },
          fontSize: 36,
          vAlign: "0%",
        },
        {
          text: {
            en: "Good to talk to someone else today",
          },
          fontSize: 36,
          vAlign: "0%",
        },
        {
          text: {
            en: "You're here for the treasure, aren’t you?",
          },
          fontSize: 36,
          vAlign: "0%",
          bIsComfirmText: true,
          comfirmTextIndex: 4,
          cancelTextIndex: 3
        },
        {
          text: {
            en: "No??? Well, there is a great treasure at the final chamber of this Tomb, but it is full of traps.",
          },
          fontSize: 28,
          vAlign: "0%",
          bEndDialog: true
        },
        {
          text: {
            en: "HOHOHO I knew it! I can see a younger version of myself in your eyes.",
          },
          fontSize: 36,
          vAlign: "0%",
        },
        {
          text: {
            en: "I can help you reach to the final chamber if you like.",
          },
          fontSize: 36,
          vAlign: "0%",
        },
        {
          text: {
            en: "But it would require some MANA you know. Maybe you can enter for free but you won't get any score.",
          },
          fontSize: 26,
          vAlign: "0%",
          comfirmText: {
            en: "E: 10 MANA",
            fontSize: 19,
          },
          cancelText: {
            en: "F: Try free",
            fontSize: 20,
          },
          bIsComfirmText: true,
          comfirmTextIndex: -1,
          cancelTextIndex: -1,
          bEndDialog: true
        },
      ]
    },
    {
      texts:[
        {
          text: {
            en: "Great, get ready pal, tomb chasers like me, are fast even in death!",
          },
          fontSize: 36,
          vAlign: "0%",
        },
        {
          text: {
            en: "and I won't be slowing down for ya",
          },
          fontSize: 26,
          vAlign: "0%",
        },
        {
          text: {
            en: "Ready..",
          },
          fontSize: 40,
          vAlign: "0%",
        },
        {
          text: {
            en: "GO",
          },
          fontSize: 40,
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
    //Win first time
    {
      texts:[
        {
          text: {
            en: "iiiiiiiiiiiiiuaaaarrrrrghhhuuffffffff",
          },
          fontSize: 36,
          vAlign: "0%",
        },
        {
          text: {
            en: "That was a great chase wasn't it?",
          },
          fontSize: 36,
          vAlign: "0%",
        },
        {
          text: {
            en: "I'm glad you made it here alive!",
          },
          fontSize: 36,
          vAlign: "0%",
        },
        {
          text: {
            en: "I never thought I would see the final chamber lighten up and working, thank you!",
          },
          fontSize: 34,
          vAlign: "0%",
        },
        {
          text: {
            en: "If you're up to another one, let's meet at the entrance!",
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
        },
        {
          text: {
            en: "If not, don't worry, you can always play the free mode",
          },
          fontSize: 36,
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
