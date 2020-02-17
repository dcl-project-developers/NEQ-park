import { PlayFab, PlayFabClientSDK } from "./src/PlayFab/PlayFabClientApi"

export var leaderboardData;
var playfabUserId: string;
var playfabUserDisplayName: string = null;

export function LoginPlayFabWithGuest(callback: Function = function(){}){
    if (!PlayFabClientSDK.IsClientLoggedIn()) {
      PlayFab.settings.titleId = "6C611";
      var loginRequest = {
          // Currently, you need to look up the correct format for this object in the API reference for LoginWithCustomID.
          TitleId: PlayFab.settings.titleId,
          CustomId: "guestuser",
          CreateAccount: true
      };
      log("LOGGIN GUEST")
      PlayFabClientSDK.LoginWithCustomID(loginRequest, function(result, error){
        if (result !== null) {
          playfabUserId = result.Request.CustomId
          callback()
          //console.log("PlayFab UserId: "+playfabUserId);
        }
      });
    }

}

export function LoginPlayFab(metamaskAddress: string, newDisplayName: string = null){

    if (!PlayFabClientSDK.IsClientLoggedIn() || playfabUserId=="guestuser") {
      PlayFab.settings.titleId = "6C611";
      //console.log("PlayFabr login: "+metamaskAddress);

      var loginRequest = {
          // Currently, you need to look up the correct format for this object in the API reference for LoginWithCustomID.
          TitleId: PlayFab.settings.titleId,
          CustomId: metamaskAddress,
          CreateAccount: true,
          InfoRequestParameters: {GetUserAccountInfo: true}
      };
      log("LOGGIN PLAYER")
      if (newDisplayName) {
        playfabUserDisplayName = newDisplayName
      }
      PlayFabClientSDK.LoginWithCustomID(loginRequest, LoginCallback);
    }

}

var LoginCallback = function (result, error) {
    if (result !== null) {
        if (result.data && result.data.InfoResultPayload && result.data.InfoResultPayload.AccountInfo) {
          if (playfabUserDisplayName && (!result.data.InfoResultPayload.AccountInfo.TitleInfo || !result.data.InfoResultPayload.AccountInfo.TitleInfo.DisplayName)) {
            PlayFabClientSDK.UpdateUserTitleDisplayName({DisplayName: playfabUserDisplayName})
          }
          else if(playfabUserDisplayName && result.data.InfoResultPayload.AccountInfo.TitleInfo.DisplayName
            && result.data.InfoResultPayload.AccountInfo.TitleInfo.DisplayName!=playfabUserDisplayName
          ){
            PlayFabClientSDK.UpdateUserTitleDisplayName({DisplayName: playfabUserDisplayName})
          }
          else{
            playfabUserDisplayName = result.data.InfoResultPayload.AccountInfo.TitleInfo.DisplayName
          }

        }
        //console.log("Custom loggin DisplayName: "+result.data.InfoResultPayload.AccountInfo.TitleInfo.DisplayName);
        //SubmitScore(10)
        //RequestLeaderboard()
    } else if (error !== null) {
          console.log("Something went wrong with your first API call.\nHere's some debug information:\n"+PlayFab.GenerateErrorReport(error));
    }
}

var OnStatisticsUpdated = function(updateResult) {
    console.log("Successfully submitted high score");
    //console.log(updateResult);
    //RequestLeaderboard()
}

var FailureCallback = function(error){
    console.log("Something went wrong with your API call. Here's some debug information:");
    console.log(error.GenerateErrorReport());
}

var OnLeaderboardRecived = function(leaderboardResult){
    if(leaderboardResult && leaderboardResult.data && leaderboardResult.data.Leaderboard){
      leaderboardData = leaderboardResult.data.Leaderboard
      //console.log(leaderboardData);
    }
}

export function SubmitScore(playerScore: float, callback = function(){}) {
    var callbackFunct = function(updateResult){
      OnStatisticsUpdated(updateResult)
      callback()
    }
    if (playfabUserId!="40807F9E083C5FE0") {
      PlayFabClientSDK.UpdatePlayerStatistics({Statistics: [
        {StatisticName: "BestTime", value: playerScore*-1}
      ]}, callbackFunct, FailureCallback);
    }
}

export function RequestLeaderboard(callback = function(){}) {
    var callbackFunction = function(leaderboardResult){
      OnLeaderboardRecived(leaderboardResult)
      callback()
    }
    PlayFabClientSDK.GetLeaderboard(
      {
        StatisticName: "BestTime",
        StartPosition: 0,
        MaxResultsCount: 10
      },
      callbackFunction, FailureCallback
    );
}
