
var app = angular.module('myApp', ['ngRoute']);


app.config(['$routeProvider',function($routeProvider){
    $routeProvider
    .when('#/',{
      templateUrl: 'round2.html',
    })
    .when('/round24',{
      templateUrl: 'round24.html',
    })
    .when('/round16',{
      templateUrl: 'round16.html',
    })
    .when('/round8',{
      templateUrl: 'round8.html',
    })
    .when('/round4',{
      templateUrl: 'round4.html',
    })
    .when('/round2',{
      templateUrl: 'round2.html',
    })
    .otherwise({
      redirectTo : '/round2'
    });
}]);

app.controller('betController',['$http','$sce', '$scope','$log','$filter','$interval','$timeout',function($http, $sce, $scope, $log,$filter,$interval,$timeout){

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
var gameResultCompare;
var betResult;

var nickPoints = 0,ivanPoints = 0,silviqPoints = 0;
var currentIndexPlaying;
var Idscore;

var staticResults;
var nikId = 'nWjLnxmbKmVofKlfJwK5n5Rqpox1';
var silId = '3mOUIGx5kiTjmTK4OZURto7WXU03';
var ivanId = '31MLzMcsXjeNufVOmbaGgCWGsIi1';
var nikIdIs = false;
var ivanIdIs = false;
var silIdIs = false;



var config = {
  apiKey: "AIzaSyB7wIBha8ulEQUAT7v9Kya_W7UT7ry25JI",
  authDomain: "table-1-cc574.firebaseapp.com",
  databaseURL: "https://table-1-cc574.firebaseio.com",
  storageBucket: "table-1-cc574.appspot.com",
};

var app = firebase.initializeApp(config);
var database = app.database();
var auth = app.auth();
var storage = app.storage();

var databseRef = database.ref().child('data');

var emailField;
var passwordField;

addRow.addEventListener('click',function(ev){
    var currentKey = 0;

    databseRef.once('value', function(data) {
      for (var key in data.val()) {
          currentKey += 1;
        }
        console.log("KEY: " + currentKey);
    });

    firebase.database().ref('data/' + currentKey).set({
          ivan: "-",
          nikolay: "-",
          silviq: "-"
      });

});


login.addEventListener('click',function(ev){
  console.log("log-in pressed");

  emailField = document.getElementById('email').value;
  passwordField = document.getElementById('password').value;

  if(emailField.length < 4){
    alert('Грешен Имейл Адрес');
    return;
  }
  if(passwordField.length < 4){
    alert('Въведете парола');
    return;
  }

        auth.signInWithEmailAndPassword(emailField,passwordField).then(function(result){
          console.log("Auth ok: "+ result.providerId + " " + result.uid);
          document.getElementById('email').value ="";
          document.getElementById('password').value ="";

          document.getElementById('password').style.visibility = "hidden";
          document.getElementById('email').style.visibility = "hidden";
          document.getElementById('login').style.visibility = "hidden";

          if(result.uid === nikId){
            document.getElementById('userId').textContent='Николай';
            nikIdIs = true;

            var inputField = document.getElementsByClassName('inputBet');
            var inputXZ = document.getElementsByClassName('inputNik');

            /*
            for(var y = 0; y < inputXZ.length; y++){

              document.getElementsByClassName('inputIvan')[y].setAttribute('readOnly','readOnly');
              document.getElementsByClassName('inputSil')[y].setAttribute('readOnly','readOnly');
            }
            */
            console.log("nik id: "+nikIdIs);
          }
          if(result.uid === ivanId){
            document.getElementById('userId').textContent='Иван';
            ivanIdIs = true;
          }
          if(result.uid === silId){
            document.getElementById('userId').textContent='Силвия';
            silIdIs = true;
          }

        },function(error){
          var errorCode = error.code;
          var errorMessage = error.message;
          if(errorCode === 'auth/wrong-password'){
            alert('Грешна парола.');
          }if(errorCode === 'auth/user-not-found' ){
            alert('Грешен потребител');
          }else{
            console.log(error);
          }
        });

});

signOut.addEventListener('click',function(){
  auth.signOut();
  console.log("Sing out!");
  document.getElementById('userId').textContent='Потребител';
  document.getElementById('password').style.visibility = "";
  document.getElementById('email').style.visibility = "";
  document.getElementById('login').style.visibility = "";
  var nikIdIs = false;
  var ivanIdIs = false;
  var silIdIs = false;
});

var zalogtest = [];
var arreyM = [];

// READ THE DATA ONCE, DONT LISEN FOR CAHNGES !
databseRef.once('value', function(snapshot) {
    $timeout(function (){
      $scope.bets123 = snapshot.val();
      console.log("TRIGGERED");
    });
});

/*
databseRef.on('value', function (snapshot) {
    $timeout(function () {
      //update(snapshot);
      $scope.bets123 = snapshot.val();
      console.log("TRIGGERED");
    });
  });
  */
/*
  function update (snapshot) {
    $scope.bets123 = snapshot.val();
    console.log("TRIGGERED");
  }
*/
  databseRef.on('child_changed', function(data) {
    console.log('changing child!');
    //$scope.bets123 = data.val();
  });



  $scope.nickChangeInput = function(index,value){
    if(nikIdIs === true && gl_games[index].status === 'TIMED'){
      console.log(index + " "+ value);
      var ind = 0;
      ind = index;
      var hopperRef = databseRef.child(ind);
        hopperRef.update({
          "nikolay": value
        });
    }
    if(nikIdIs === false || gl_games[index].status != 'TIMED'){
      console.log(gl_games[index].status);
      alert('ГРЕШКА');
    }


  };
  $scope.ivanChangeInput = function(index,value){
    if(ivanIdIs === true && gl_games[index].status === 'TIMED'){
      console.log(index + " "+ value);
      var ind = 0;
      ind = index;
      var hopperRef = databseRef.child(ind);
        hopperRef.update({
          "ivan": value
        });
    }
    if(ivanIdIs === false || gl_games[index].status != 'TIMED'){
      console.log(gl_games[index].status);
      alert('ГРЕШКА');
    }

  };
  $scope.silChangeInput = function(index,value){
    if(silIdIs === true && gl_games[index].status === 'TIMED'){
      console.log(index + " "+ value);
      var ind = 0;
      ind = index;
      var hopperRef = databseRef.child(ind);
        hopperRef.update({
          "silviq": value
        });
    }
    if(silIdIs === false || gl_games[index].status != 'TIMED'){
      console.log(gl_games[index].status);
      alert('ГРЕШКА');
    }

  };

  $scope.changedElement = function(index,value,value2,value3){
    console.log('CHANGE!' + index + " "+value);
    //databseRef.update({"index/ivan": "value"});
    index = index + 36;
    if(nikIdIs === true){

/*
      var inputXZ = document.getElementsByClassName('inputNik');
  for(var y = 0; y < inputXZ.length; y++){
    document.getElementsByClassName('inputNik')[y].removeAttribute('readOnly');
    document.getElementsByClassName('inputIvan')[y].setAttribute('readOnly','readOnly');
    document.getElementsByClassName('inputSil')[y].setAttribute('readOnly','readOnly');
    console.log('REMOVIGN');
    }
    */
      firebase.database().ref('data/' + index).set({
            nikolay: value,
            ivan: value2,
            silviq: value3
        });
    }
    if(ivanIdIs === true){
      firebase.database().ref('data/' + index).set({
            ivan: value,
            nikolay: value2,
            silviq: value3
        });
    }
    if(silIdIs === true){
      firebase.database().ref('data/' + index).set({
            silviq: value,
            nikolay: value2,
            ivan: value3
        });
    }else{
      console.log( 'Not Writing!' );

    }

  };

/*
function getDataFromFirebase(){
    databseRef.on('child_added', function(snapshot){
       for (var i = 0; i < snapshot.val().length; i++) {
            arreyM[i].nikolay= snapshot.val()[i].nikolay;
            arreyM[i].ivan= snapshot.val()[i].ivan;
            arreyM[i].silviq=snapshot.val()[i].silviq;
       }

    });
    return arreyM;
}
function test2(){
  databseRef.once('value', function(data) {
    console.log(data.val().ivan);
    for (var key in data.val()) {
        console.log(key, data.val()[key].ivan);
        zalogtest[key].nikolay = data.val()[key].nikolay;
        zalogtest[key].ivan = data.val()[key].ivan;
        zalogtest[key].silviq = data.val()[key].silviq;
      }

  });
}
window.onload = function() {
  test2();
  console.log(zalogtest);
};
*/
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
  {nikolay: '1 : 1', ivan: '1 : 0', silviq: '0 : 1'},
  {nikolay: '0 : 2', ivan: '0 : 2', silviq: '2 : 0'},
  {nikolay: '1 : 1', ivan: '0 : 2', silviq: '0 : 1'},
  {nikolay: '0 : 0', ivan: '2 : 1', silviq: '0 : 1'},
  {nikolay: '-',     ivan: '-',     silviq: '-'},
  {nikolay: '-',     ivan: '-',     silviq: '-'},
  {nikolay: '1 : 0', ivan: '2 : 1', silviq: '0 : 2'},
  {nikolay: '2 : 2', ivan: '1 : 1', silviq: '2 : 1'},
  {nikolay: '-',     ivan: '-',     silviq: '-'},
  {nikolay: '-',     ivan: '-',     silviq: '-'},
  {nikolay: '1 : 1', ivan: '1 : 2', silviq: '1 : 0'},
  {nikolay: '1 : 0', ivan: '1 : 1', silviq: '3 : 1'},

  {nikolay: '-',     ivan: '-',     silviq: '-'},
  {nikolay: '1 : 1', ivan: '3 : 1', silviq: '2 : 0'},
  {nikolay: '3 : 2', ivan: '2 : 1', silviq: '1 : 2'},

  {nikolay: '-',     ivan: '-',     silviq: '-'},
  {nikolay: '2 : 1', ivan: '2 : 0', silviq: '1 : 0'},
  {nikolay: '1 : 1', ivan: '1 : 2', silviq: '0 : 2'},
  {nikolay: '-',     ivan: '-',     silviq: '-'},
  {nikolay: '-',     ivan: '-',     silviq: '-'}
];

$scope.zalog = zalog;

/*
var zalog;
var url = "data/betData.json";
var url2 = "http://icodefish.com/euro2016/data/betData.json";

$http.get(url2).success(function(data) {
        zalog = data;
        console.log("data added!");
});

$scope.zalog = zalog;
  console.log($scope.zalog);
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
          console.log(gl_games);
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

          function compareCorrect(){
            console.log("COMAPRE?");
            for(var i = 0;i<gl_games.length; i++){
              if(gl_games[i].status === 'FINISHED'){
                gameResultCompare = gl_games[i].result.goalsHomeTeam +" : "+ gl_games[i].result.goalsAwayTeam;
                  if(gameResultCompare.toString() === zalog[i].nikolay.toString()){
                      console.log(i +" "+ gameResultCompare +" Nick " + zalog[i].nikolay.toString());
                        nickPoints += 1;

                  }if(gameResultCompare.toString() === zalog[i].ivan.toString()){
                    console.log(i +" "+ gameResultCompare +" Ivan " + zalog[i].ivan.toString());
                    ivanPoints += 1;

                  }if(gameResultCompare.toString() === zalog[i].silviq.toString()){
                    console.log(i +" "+ gameResultCompare +" Sil " + zalog[i].silviq.toString());
                    silviqPoints += 1;
                  }
                }
              }
            }
    //  compareCorrect();
    // Crashing on something
      nickPoints = 5;
      ivanPoints = 2;
      silviqPoints = 3;

      $scope.nickPoints = nickPoints;
      $scope.ivanPoints = ivanPoints;
      $scope.silviqPoints = silviqPoints;
      betSuccessful = nickPoints + ivanPoints + silviqPoints;
      console.log("Successful bets: " + betSuccessful);


      staticResults = data.fixtures;

    $scope.getCorrectColor = function(index,betScore){
      gameResult = staticResults[index].result.goalsHomeTeam +" : "+ staticResults[index].result.goalsAwayTeam;

              if(staticResults[index].status === 'FINISHED' && gameResult.toString() === betScore.toString()){
                    return "won";
              }
              if(staticResults[index].status === 'FINISHED' && betScore.toString() === '-'){
                    return "non";
              }else if(staticResults[index].status === 'FINISHED' && gameResult.toString() != betScore.toString()){
                    return "lost";
              }
              else{
                    return "non";
              }
    };

    /*
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

      */



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

      getCurrentGameTime();
     $interval(getCurrentGameTime, 55000);


      function getStats(){
        // AVG GOALS, GAMES PLAYED
          for(var g =0;g<gl_games.length; g++){
            if(gl_games[g].status.toString() === 'FINISHED'){
              gamesPlayed += 1;
              totalGoals += gl_games[g].result.goalsHomeTeam + gl_games[g].result.goalsAwayTeam;
            }
          }
          var tmp = totalGoals / gamesPlayed;
          avgGoals = tmp.toString().slice(0,4); // devision 0.3131231 slicing first 4

          // Successful bets
          for(var b = 0; b<zalog.length; b++){
              if(zalog[b].nikolay.toString() != '-'){
                  betsTotal += 1;
              }
          }
          betsTotalT = betsTotal * 3;
          var tmp2 = (betSuccessful/betsTotalT) *100;
          betsPercent = tmp2.toString().slice(0,4);

          $scope.gamesPlayed = gamesPlayed;
          $scope.totalGoals = totalGoals;
          $scope.avgGoals = avgGoals;
          $scope.betsTotalT = betsTotalT;
          $scope.betsPercent = betsPercent;
          $scope.betSuccessful = betSuccessful;
        }
        getStats();



              // Compare result from games to bets!
              // dont need to loop throu both arrays ( not comparing first value to all values from 2nd array)
              function testArray(){
                for(var i = 0;i<gl_games.length; i++){
                  if(gl_games[i].status === 'FINISHED'){
                    gameResult = gl_games[i].result.goalsHomeTeam +" : "+ gl_games[i].result.goalsAwayTeam;
                      if(gameResult.toString() === zalog[i].nikolay.toString()){
                          console.log(i +" "+ gameResult +" NNN " + zalog[i].nikolay.toString());
                      }else if(gameResult.toString() === zalog[i].ivan.toString()){
                        console.log(i +" "+ gameResult +" III " + zalog[i].ivan.toString());
                      }else if(gameResult.toString() === zalog[i].silviq.toString()){
                        console.log(i +" "+ gameResult +" SSS " + zalog[i].silviq.toString());
                      }
              }
            }
          }




  /*
        var datesArray = [];
        for( var x = 0; x<gl_games.length; x++){
                    datesArray.push(gl_games[x].date.slice(5,10));
        }

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

          */

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

      // GET TEAMS FOR FLAGS
      $http.get('http://api.football-data.org/v1/soccerseasons/424/teams',
          { headers:{'X-Auth-Token': '2d9073763e924684a4162cea8d3817f4'}},{
          }).success(function (data) {
              var tmp = data.teams;
               gl_teams = data.teams;
              $scope.teams = tmp;
              function getFlag(name){
                  for(var i = 0; i <gl_teams.length;i++){
                         if(gl_teams[i].name.toString() === name){
                           return gl_teams[i].crestUrl;
                         }
                  }

             }

             $scope.getFlag = getFlag;
          });



}]);
