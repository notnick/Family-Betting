
var app = angular.module('myApp', []);

app.controller('betController',['$http','$sce', '$scope','$log','$filter','$interval',function($http, $sce, $scope, $log,$filter,$interval){

var gl_games;
var gl_teams;

var gamesPlayed = 0;
var totalGoals = 0;
var avgGoals = 0;

var betsTotal = 0;
var betsTotalT = 0;
var betSuccessful = 0;
var betsPercent = 0;

var currentHomeScore = 0;
var currentAwayScore = 0;

var gameResult;
var betResult;

var nickPoints = 0,ivanPoints = 0,silviqPoints = 0;
var currentIndexPlaying;

var zalog = [
                {nikolay: '2 : 0', ivan: '0 : 1', silviq: '1 : 0'},
                {nikolay: '-',     ivan: '-',     silviq: '-'},
                {nikolay: '-',     ivan: '-',     silviq: '-'},
                {nikolay: '1 : 1', ivan: '2 : 1', silviq: '3 : 1'},
                {nikolay: '-',     ivan: '-',     silviq: '-'},
                {nikolay: '-',     ivan: '-',     silviq: '-'},
                {nikolay: '1 : 0', ivan: '3 : 0', silviq: '2 : 0'},
                {nikolay: '-',     ivan: '-',     silviq: '-'},
                {nikolay: '-',     ivan: '-',     silviq: '-'},
                {nikolay: '1 : 1', ivan: '2 : 2', silviq: '0 : 1'},
                {nikolay: '0 : 0', ivan: '2 : 0', silviq: '1 : 1'},
                {nikolay: '1 : 0', ivan: '3 : 0', silviq: '2 : 0'},
                {nikolay: '-',     ivan: '-',     silviq: '-'},
                {nikolay: '1 : 1', ivan: '1 : 0', silviq: '2 : 0'},
                {nikolay: '-',     ivan: '-',     silviq: '-'},
                {nikolay: '2 : 1', ivan: '2 : 2', silviq: '1 : 0'},
                {nikolay: '-',     ivan: '-',     silviq: '-'},
                {nikolay: '2 : 1', ivan: '3 : 0', silviq: '2 : 0'},
                {nikolay: '-',     ivan: '-',     silviq: '-'},
                {nikolay: '1 : 1', ivan: '0 : 2', silviq: '0 : 1'},
                {nikolay: '2 : 0', ivan: '3 : 0', silviq: '1 : 1'},
                {nikolay: '1 : 1', ivan: '3 : 1', silviq: '2 : 2'},
                {nikolay: '-',     ivan: '-',     silviq: '-'},
                {nikolay: '1 : 0', ivan: '2 : 0', silviq: '2 : 0'},
                {nikolay: '1 : 1', ivan: '1 : 0', silviq: '2 : 0'},
                {nikolay: '0 : 2', ivan: '0 : 2', silviq: '0 : 1'},
                {nikolay: '1 : 1', ivan: '0 : 2', silviq: '0 : 1'},
                {nikolay: '0 : 0', ivan: '2 : 1', silviq: '0 : 1'},
                {nikolay: '-',     ivan: '-',     silviq: '-'},
                {nikolay: '-',     ivan: '-',     silviq: '-'},
                {nikolay: '1 : 0', ivan: '2 : 1', silviq: '2 : 1'},
                {nikolay: '2 : 2', ivan: '1 : 1', silviq: '0 : 2'},
                {nikolay: '-',     ivan: '-',     silviq: '-'},
                {nikolay: '-',     ivan: '-',     silviq: '-'},
                {nikolay: '1 : 1', ivan: '1 : 1', silviq: '1 : 0'},
                {nikolay: '1 : 0', ivan: '1 : 2', silviq: '3 : 1'},
            ];
$scope.zalog = zalog;

/*
var zalog1;
var url = "script/betsdata.json";
    $http.get(url).success( function(dta) {
        console.log(dta);
        $scope.zalog1 = dta;
        zalog1 = dta;
     });
*/
// Doing this because the 36 array doesnt know the full URI to the
// fixture game. we need to slice the last 3-4 digits to get it. --><--
$scope.getLastFiveGames = function(teamURI,clTeamName){
  var teamId = teamURI.slice(38);
  var teamName = clTeamName.toString();
  $http.get('http://api.football-data.org/v1/teams/'+teamId+'/fixtures',
      { headers:{'X-Auth-Token': '2d9073763e924684a4162cea8d3817f4'}},{
      }).success(function (data) {
        var lastGamesPlayed = data.fixtures;
        $scope.showModal = true;
        $scope.teamName = teamName;
        console.log(lastGamesPlayed);
        $scope.lastGamesPlayed = lastGamesPlayed;
        for(var i = 0; i < lastGamesPlayed.length; i++){
          console.log(lastGamesPlayed[i].homeTeamName+":"+ lastGamesPlayed[i].awayTeamName);
        }
      });
};


// When open the site if any game is live update the score every 2mins.
  function updateScore(){
    $http.get('http://api.football-data.org/v1/soccerseasons/424/fixtures',
        { headers:{'X-Auth-Token': '2d9073763e924684a4162cea8d3817f4'}},{
        }).success(function (data) {
          var today = new Date();
          var mm = today.getMinutes();
          var hh = today.getHours();
          console.log("Score Updated"+hh+":"+mm);
          gl_games = data.fixtures;
            for(var i = 0; i<gl_games.length;i++){
              if(gl_games[i].status === 'IN_PLAY'){
                currentHomeScore = gl_games[i].result.goalsHomeTeam;
                currentAwayScore = gl_games[i].result.goalsAwayTeam;
                currentHomeTeamPlaying = gl_games[i].homeTeamName;
                console.log(i + currentHomeTeamPlaying + " "+currentHomeScore +":"+currentAwayScore );
                $scope.currentHomeScore = currentHomeScore;
                $scope.currentAwayScore = currentAwayScore;
                $scope.currentIndexPlaying = i;
              }
            }

        });

    }
      updateScore();
     $interval(updateScore, 120 * 1000);


  $http.get('http://api.football-data.org/v1/soccerseasons/424/fixtures',
      { headers:{'X-Auth-Token': '2d9073763e924684a4162cea8d3817f4'}},{
      }).success(function (data) {

          var arr = data.fixtures;
          gl_games = data.fixtures;

          $scope.results = arr;
          console.log(arr);



          // GET CORRECT AMOUT OF BETS RIGHT, NUMBER OF POINTS OF EACH
      function compareResults(){
        for(var i = 0;i<gl_games.length; i++){
          if(gl_games[i].status === 'FINISHED'){
            gameResult = gl_games[i].result.goalsHomeTeam +" : "+ gl_games[i].result.goalsAwayTeam;
            for(var p = 0; p < zalog.length; p++){

               if(gameResult.toString() === zalog[i].nikolay.toString()){
                 console.log(i +" "+ gameResult +" NIK " + zalog[i].nikolay.toString());
                 nickPoints++;
               }else if(gameResult.toString() === zalog[i].ivan.toString()){
                 console.log(i +" "+ gameResult +" IVAN " + zalog[i].ivan.toString());
                 ivanPoints++;
               }else if(gameResult.toString() === zalog[i].silviq.toString()){
                 console.log(i +" "+ gameResult +" Silviq " + zalog[i].silviq.toString());
                 silviqPoints++;
               }

            }
          }
        }
      }
      compareResults();
      $scope.nickPoints = nickPoints/zalog.length;
      $scope.ivanPoints = ivanPoints/zalog.length;
      $scope.silviqPoints = silviqPoints/zalog.length;
      betSuccessful = nickPoints/zalog.length + ivanPoints/zalog.length + silviqPoints/zalog.length;
      console.log(nickPoints/zalog.length +" "+ ivanPoints/zalog.length + " " + silviqPoints/zalog.length);

      function getCurrentGameTime(){

        var today = new Date();
        var mm = today.getMinutes();
        var hh = today.getHours();
        var startingTime;
        var startingTimeHour;
        var currentGameTime = 0;

        for(var t = 0; t< gl_games.length; t++){
          if(gl_games[t].status.toString() === 'IN_PLAY'){
            startingTime = gl_games[t].date;
            startingTime = $filter('date')(startingTime, "HH:mm");
            startingTimeHour = startingTime.slice(0,2);

                if(hh.toString() === startingTimeHour.toString()){
                    currentGameTime = mm;
                    if(currentGameTime >= 45){
                      currentGameTime = 45;
                    }
                }else if(hh.toString() != startingTimeHour.toString()){
                  //var timetemp = mm + 45;
                  currentGameTime = 45 + mm;
                }
          }
        }

        if(currentGameTime >= 90){
          currentGameTime = 90;
        }
        $scope.currentGameTime = currentGameTime;

      }

      function getStats(){
          for(var m = 0; m < gl_games.length; m++){
            if(gl_games[m].status.toString() === 'FINISHED'){
              gamesPlayed++;
            }
          }

          for(var g =0;g<gl_games.length; g++){
            if(gl_games[g].status.toString() === 'FINISHED'){
              var home,away;
              totalGoals += gl_games[g].result.goalsHomeTeam + gl_games[g].result.goalsAwayTeam;
            }
            var tmp = totalGoals / gamesPlayed;
            avgGoals = tmp.toString().slice(0,4);
          }

          for(var b = 0; b<zalog.length; b++){
              if(zalog[b].nikolay.toString() != '-'){
                  betsTotal += 1;
              }
             betsTotalT = betsTotal * 3;
             var tmp2 = (betSuccessful/betsTotalT) *100;
             betsPercent = tmp2.toString().slice(0,4);
          }


          $scope.gamesPlayed = gamesPlayed;
          $scope.totalGoals = totalGoals;
          $scope.avgGoals = avgGoals;
          $scope.betsTotalT = betsTotalT;
          $scope.betsPercent = betsPercent;
          $scope.betSuccessful = betSuccessful;

        }


        var datesArray = [];
        for( var x = 0; x<gl_games.length; x++){
            datesArray.push(gl_games[x].date.slice(5,10));
        }


        getStats();

        getCurrentGameTime();
        $interval(getCurrentGameTime, 30000);



      // count duplicates in the date array
        function duplicatesNum(original){
            var compressed = [];
            var copy = original.slice(0);

              for(var i = 0; i < original.length; i++){
                var myCount = 0;
                  for(var y = 0; y < copy.length; y++){
                    if(original[i] === copy[y]){
                      myCount ++;
                      delete copy[y];
                    }
                  }
              if (myCount > 0) {
                      var a = {};
                      a.value = original[i];
                      a.count = myCount;
                      compressed.push(a);
                  }
            }
            return compressed;
        }

          var newArray = duplicatesNum(datesArray);
          console.log(newArray);

          $scope.timeline = newArray;


          /*
          newDate = newDate.toString().slice(5,10);
          console.log("dates - "+ newDate);
          */

          /*
          for(var i =0; i<gl_games.length;i++){
            if(gl_games[i].status.toString() === "FINISHED"){

              var home = gl_games[i].result.goalsHomeTeam.toString();
              var away=  gl_games[i].result.goalsAwayTeam.toString();
              var temp = home+":"+away;
              var endString = temp.replace(/ /g, '');

              console.log(i+1 + " "+ endString);

              for(var j = 0; j< zalog.length; j++){
                  // If we compare to table values wont need to check each object
                  // ---  ?  if td.value.toString.replace() == endString td[i].addClass('highihg');

                  if(endString === zalog[i].nikolay.toString().trim().replace(/ /g, '')){
                    console.log("nikolay " + endString);
                  }else if(endString === zalog[i].ivan.toString().trim().replace(/ /g, '')){
                    console.log("ivan " + endString);
                  }else if(endString === zalog[i].silviq.toString().trim().replace(/ /g, '')){
                    console.log("silviq " + endString);
                  }else{

                  }
              }

            }else{
            }

          }

          */

      });

      $http.get('http://api.football-data.org/v1/soccerseasons/424/teams',
          { headers:{'X-Auth-Token': '2d9073763e924684a4162cea8d3817f4'}},{
          }).success(function (data) {
              var tmp = data.teams;
               gl_teams = data.teams;
              $scope.teams = tmp;
              console.log(tmp);
              console.log(gl_teams);


              function getFlag(name){
                  for(var i = 0; i <gl_teams.length;i++){
                         if(gl_teams[i].name.toString() === name){
                           return gl_teams[i].crestUrl;
                         }
                  }

             }

             $scope.getFlag = getFlag;


          });

  $log.info($scope);

}]);
