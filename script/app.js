
var app = angular.module('myApp', []);

app.controller('betController',['$http','$sce', '$scope','$log',function($http, $sce, $scope, $log){

var gl_games;
var gl_teams;

var zalog = [   {nikolay: '2 : 0', ivan: '0 : 1', silviq: '?'},
                {nikolay: '-', ivan: '-', silviq: '-'},
                {nikolay: '-', ivan: '-', silviq: '-'},
                {nikolay: '1 : 1', ivan: '2 : 1', silviq: '3 : 1'},
                {nikolay: '-', ivan: '-', silviq: '-'},
                {nikolay: '-', ivan: '-', silviq: '-'},
                {nikolay: '1 : 0', ivan: '3 : 0', silviq: '2 : 0'},
                {nikolay: '-', ivan: '-', silviq: '-'},
                {nikolay: '-', ivan: '-', silviq: '-'},
                {nikolay: '1 : 1', ivan: '2 : 2', silviq: '0 : 1'},
            ];

  $http.get('http://api.football-data.org/v1/soccerseasons/424/fixtures',
      { headers:{'X-Auth-Token': '2d9073763e924684a4162cea8d3817f4'}},{
      }).success(function (data) {

          var arr = data.fixtures;
          gl_games = data.fixtures;

          $scope.results = arr;
          console.log(arr);




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







  $scope.zalog = zalog;



  $log.info($scope);

}]);
