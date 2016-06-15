
var app = angular.module('myApp', []);

app.controller('betController',['$http','$sce', '$scope','$log',function($http, $sce, $scope, $log){

var gl_games;
var gl_teams;

var zalog = [
                {nikolay: '2 : 0', ivan: '0 : 1', silviq: '?'},
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
            ];

  $http.get('http://api.football-data.org/v1/soccerseasons/424/fixtures',
      { headers:{'X-Auth-Token': '2d9073763e924684a4162cea8d3817f4'}},{
      }).success(function (data) {

          var arr = data.fixtures;
          gl_games = data.fixtures;

          $scope.results = arr;
          console.log(arr);

          var p = new Date();
          console.log("Original date "+p);
          p = (p.getMonth() + 1) + "-" + p.getDate() + "-" + p.getFullYear();
          console.log("P: " + p);

        var counter = 0;
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

          app.filter('timelineHeight', function () {
            return function (input) {
              if (input === 'widescreen') {
                return '270px';
              } else {
                return '360px';
              }
            };
          });
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







  $scope.zalog = zalog;



  $log.info($scope);

}]);
