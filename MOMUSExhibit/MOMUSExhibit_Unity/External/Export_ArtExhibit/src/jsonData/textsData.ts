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
            en: "Welcome to the the Aetheria Block Museum!",
          },
          fontSize: 30,
          vAlign: "0%",
        },
        {
          text: {
            en: "This VR museum tells you the history of ethereum throught art.",
          },
          fontSize: 30,
          vAlign: "0%",
        },
        {
          text: {
            en: "The exhibited blocks are organized into 5 groups: \"The First Million\", \"Early Days - theDAO\", \"Denial of Service\", \"The Bull Times\" and \"The Peak of Inflated Expectations\"",
          },
          fontSize: 20,
          vAlign: "0%",
        },
        {
          text: {
            en: "You'll be able to digest the story behind the multiple hard forks, several infamous transactions (theDAO creation, the Parity multisig library suicide)....",
          },
          fontSize: 20,
          vAlign: "0%",
        },
        {
          text: {
            en: "For each Block you can ask info to another Robot guide Or click into one of the artworks.",
          },
          fontSize: 20,
          vAlign: "0%",
        },
        {
          text: {
            en: "The collection is currently composed of two series, both data art seeded from block information: the CryptoArte project by Sebastian Brocher and a hybrid data art/drawing series from @HEX0x6C and Chiara Braidotti.",
          },
          fontSize: 20,
          vAlign: "0%",
          bEndDialog: true
        },
      ]
    },
    {
      texts:[
        {
          text: {
            en: "Hi there! I can talk you about \"the First million\", Do you want more info about it?",
          },
          fontSize: 30,
          vAlign: "0%",
          bIsComfirmText: true,
          comfirmTextIndex: 2,
          cancelTextIndex: 1
        },
        {
          text: {
            en: "oh! Okay no problem",
          },
          fontSize: 36,
          vAlign: "0%",
          bEndDialog: true
        },
        {
          text: {
            en: "Great!",
          },
          fontSize: 36,
          vAlign: "0%",
        },
        {
          text: {
            en: "In this first Floor of the exposition, we have exposed the collection \"The First million\", where the first steps of Ethereum are represented.",
          },
          fontSize: 20,
          vAlign: "0%",
        },
        {
          text: {
            en: "From the first clients, the first encrypted wallets, until the first development conference in London. These aimed to educate and inspire the masses as to the robust future of Ethereum and to highlight its overwhelming social implications.",
          },
          fontSize: 20,
          vAlign: "0%",
        },
        {
          text: {
            en: "The first floor shows how the first developers were therefore in a position to better understand the promising direction of the blockchain-based distributed computing platform.",
          },
          fontSize: 20,
          vAlign: "0%",
        },
        {
          text: {
            en: "And the ability to run new bussiness models.",
          },
          fontSize: 20,
          vAlign: "0%",
          bEndDialog: true
        },
      ]
    },
    {
      texts:[
        {
          text: {
            en: "Hi there! I can talk you about \"Early Days -the DAO\", Do you want more info about it?",
          },
          fontSize: 30,
          vAlign: "0%",
          bIsComfirmText: true,
          comfirmTextIndex: 2,
          cancelTextIndex: 1
        },
        {
          text: {
            en: "no problem, I'm here if you need me",
          },
          fontSize: 36,
          vAlign: "0%",
          bEndDialog: true
        },
        {
          text: {
            en: "Here we go!",
          },
          fontSize: 36,
          vAlign: "0%",
        },
        {
          text: {
            en: "In these part of the exposition we show the step the DAO followed until it was attacked and darined of its funds,in June 17 of 2016.",
          },
          fontSize: 20,
          vAlign: "0%",
        },
        {
          text: {
            en: "Following that the DAO fork was implememented, which allowed a new processing rule at the fork block, all balances in theDAO and child DAOs would be zeroed out and refunds would be available to contributors in a newly written refund contract.",
          },
          fontSize: 20,
          vAlign: "0%",
          bEndDialog: true
        },
      ]
    },
    {
      texts:[
        {
          text: {
            en: "Hi there! I can talk you about \"Denial of Service\", Do you want more info about it?",
          },
          fontSize: 30,
          vAlign: "0%",
          bIsComfirmText: true,
          comfirmTextIndex: 2,
          cancelTextIndex: 1
        },
        {
          text: {
            en: "cool cool, ok",
          },
          fontSize: 36,
          vAlign: "0%",
          bEndDialog: true
        },
        {
          text: {
            en: "Great",
          },
          fontSize: 36,
          vAlign: "0%",
        },
        {
          text: {
            en: "Followind the DAO, on September 2016, the first Denial of Service (DoS) attack began, with many users reporting that they could not sync past block 2283415, reporting out-of-memory errors.",
          },
          fontSize: 20,
          vAlign: "0%",
        },
        {
          text: {
            en: "in the middle of this chaos Devcon-2 in China was launched, puttind the development teams in the spotlight. Running their booth while identifying the attacker.",
          },
          fontSize: 20,
          vAlign: "0%",
        },
        {
          text: {
            en: "A month later, another attack happen, denominated this time The Suicide bomb attacks. It created a lot of new accounts  via SUICIDE call, which costed less gas.",
          },
          fontSize: 20,
          vAlign: "0%",
        },
        {
          text: {
            en: "These attacks took a serious tool on the immediate network of the Ethereum Blockchain, with a lot of nodes not being able to sync. Hard forks had to be quickly planned and implemented by client teams in order to restore operations.",
          },
          fontSize: 20,
          vAlign: "0%",
        },
        {
          text: {
            en: "On November 22nd, 2016, the Ethereum network underwent the “Spurious Dragon” hard fork at block 2,675,000. It was the second hard fork in response to the DoS attacks.",
          },
          fontSize: 20,
          vAlign: "0%",
          bEndDialog: true

        },
      ]
    },
    {
      texts:[
        {
          text: {
            en: "Hi there! I can talk you about \"The Bull Times\", Do you want more info about it?",
          },
          fontSize: 30,
          vAlign: "0%",
          bIsComfirmText: true,
          comfirmTextIndex: 2,
          cancelTextIndex: 1
        },
        {
          text: {
            en: "until next time!",
          },
          fontSize: 36,
          vAlign: "0%",
          bEndDialog: true
        },
        {
          text: {
            en: "Yeah! of course",
          },
          fontSize: 36,
          vAlign: "0%",
        },
        {
          text: {
            en: "-In this exposition you can how the Ethereum contract was secured, in order to prevent further attcacks. Like reforcing the smart contract and the wallets.",
          },
          fontSize: 20,
          vAlign: "0%",
        },
        {
          text: {
            en: "Also here comes the first steps of Decentraland and its formation. The Virtual Reality (VR) world that you are currently visiting. Then came the Terraform, the initial generation of LAND within Decentraland in September 2017.",
          },
          fontSize: 20,
          vAlign: "0%",
        },
        {
          text: {
            en: "In addition, on 2017 the Byzantium fork was activated, which ushered in major improvements to the Ethereum blockchain including the introduction of STATICCALL (EIP-214). Additionally, Byzantium diffused the difficulty timebomb for a first time, marking the end of the first Ethereum Ice Age.",
          },
          fontSize: 20,
          vAlign: "0%",
        },
      ]
    },
    {
      texts:[
        {
          text: {
            en: "-Hi there! I can talk you about \"The Peak of Inflated Expectations\", Do you want more info about it?",
          },
          fontSize: 30,
          vAlign: "0%",
          bIsComfirmText: true,
          comfirmTextIndex: 2,
          cancelTextIndex: 1
        },
        {
          text: {
            en: "I will be right here if you need me",
          },
          fontSize: 36,
          vAlign: "0%",
          bEndDialog: true
        },
        {
          text: {
            en: "Here we go!",
          },
          fontSize: 36,
          vAlign: "0%",
        },
        {
          text: {
            en: "In here you can find the last steps of the Ethereum until nowadays. From Devcon-3 in Cancun and Devcon-4 in Prague, the launch of Cryptokitties or the Maker DAI. ",
          },
          fontSize: 20,
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
