
$( document ).ready(function() {



  $(".results-table tr:nth-child(1) td:nth-child(2)").css("background","rgba(238, 83, 80, 0.5)");
  $(".results-table tr:nth-child(1) td:nth-child(3)").css("background","rgba(238, 83, 80, 0.5)");
  $(".results-table tr:nth-child(1) td:nth-child(4)").css("background","rgba(238, 83, 80, 0.5)");

  $(".results-table tr:nth-child(4) td:nth-child(2)").css("background","rgba(102, 237, 90, 0.5)");
  $(".results-table tr:nth-child(4) td:nth-child(3)").css("background","rgba(238, 83, 80, 0.5)");
  $(".results-table tr:nth-child(4) td:nth-child(4)").css("background","rgba(238, 83, 80, 0.5)");

  $(".results-table tr:nth-child(7) td:nth-child(2)").css("background","rgba(238, 83, 80, 0.5)");
  $(".results-table tr:nth-child(7) td:nth-child(3)").css("background","rgba(238, 83, 80, 0.5)");
  $(".results-table tr:nth-child(7) td:nth-child(4)").css("background","rgba(102, 237, 90, 0.5)");

  $(".results-table tr:nth-child(10) td:nth-child(2)").css("background","rgba(238, 83, 80, 0.5)");
  $(".results-table tr:nth-child(10) td:nth-child(3)").css("background","rgba(238, 83, 80, 0.5)");
  $(".results-table tr:nth-child(10) td:nth-child(4)").css("background","rgba(238, 83, 80, 0.5)");

  $(".results-table tr:nth-child(11) td:nth-child(2)").css("background","rgba(238, 83, 80, 0.5)");
  $(".results-table tr:nth-child(11) td:nth-child(3)").css("background","rgba(238, 83, 80, 0.5)");
  $(".results-table tr:nth-child(11) td:nth-child(4)").css("background","rgba(238, 83, 80, 0.5)");

  $(".results-table tr:nth-child(12) td:nth-child(2)").css("background","rgba(238, 83, 80, 0.5)");
  $(".results-table tr:nth-child(12) td:nth-child(3)").css("background","rgba(238, 83, 80, 0.5)");
  $(".results-table tr:nth-child(12) td:nth-child(4)").css("background","rgba(238, 83, 80, 0.5)");

  $(".results-table tr:nth-child(14) td:nth-child(2)").css("background","rgba(102, 237, 90, 0.5)");
  $(".results-table tr:nth-child(14) td:nth-child(3)").css("background","rgba(238, 83, 80, 0.5)");
  $(".results-table tr:nth-child(14) td:nth-child(4)").css("background","rgba(238, 83, 80, 0.5)");

  $(".results-table tr:nth-child(16) td:nth-child(2)").css("background","rgba(102, 237, 90, 0.5)");
  $(".results-table tr:nth-child(16) td:nth-child(3)").css("background","rgba(238, 83, 80, 0.5)");
  $(".results-table tr:nth-child(16) td:nth-child(4)").css("background","rgba(238, 83, 80, 0.5)");

  $(".results-table tr:nth-child(18) td:nth-child(2)").css("background","rgba(238, 83, 80, 0.5)");
  $(".results-table tr:nth-child(18) td:nth-child(3)").css("background","rgba(238, 83, 80, 0.5)");
  $(".results-table tr:nth-child(18) td:nth-child(4)").css("background","rgba(238, 83, 80, 0.5)");

  $(".results-table tr:nth-child(20) td:nth-child(2)").css("background","rgba(238, 83, 80, 0.5)");
  $(".results-table tr:nth-child(20) td:nth-child(3)").css("background","rgba(238, 83, 80, 0.5)");
  $(".results-table tr:nth-child(20) td:nth-child(4)").css("background","rgba(238, 83, 80, 0.5)");

  $(".results-table tr:nth-child(21) td:nth-child(2)").css("background","rgba(238, 83, 80, 0.5)");
  $(".results-table tr:nth-child(21) td:nth-child(3)").css("background","rgba(102, 237, 90, 0.5)");
  $(".results-table tr:nth-child(21) td:nth-child(4)").css("background","rgba(238, 83, 80, 0.5)");




   var today = new Date();
   var dd = today.getDate();
   var mm = today.getMonth()+1;
   var tt = today.getMinutes();
   var hh = today.getHours();

   var startingTime = '12:00';
   var startingTimeHour = '12';
   var currentGameTime = 0;
   console.log("getMinutes?" + tt);
   console.log("getHours?" + hh);

   function getGameTime(){
     if(startingTimeHour.toString() === hh.toString()){
       console.log('Still in the 1st hour');
       currentGameTime += tt;
       if(currentGameTime >= 45){
         currentGameTime = 45;
       }
     }else{
       currentGameTime += tt + 45;
     }
     console.log(currentGameTime);
   }


   $('[data-toggle="tooltip"]').tooltip();


// Two Dynamic tables - same row highlight

   $(document).on("mouseenter", "table.grid tr:not(:first-child)", function() {
     console.log("hover");
     var $trs = $('table.grid tr:not(:first-child)');
     var i = $(this).index()+1;
     $trs.filter(':nth-child(' + i + ')').addClass('highlight');
    });

    $(document).on("mouseleave", "table.grid tr:not(:first-child) ", function() {
      var $trs = $('table.grid tr:not(:first-child)');
      var i = $(this).index()+1;
      $trs.filter(':nth-child(' + i + ')').removeClass('highlight');
    });




    function setScoreColours(){
      var table = document.getElementById('rsTable'),
          rows = table.rows, rowcount = rows.length, r,
          cells, cellcount, c, cell;

      var td  = document.getElementById('rsTable').getElementsByTagName('td');
      tdcount = td.length;

      for(var t = 0; t < tdcount; t++){
        if(td[t].innerHTML.toString() === '-'){
          $(td[t]).addClass('scoreTableBG');
        }
      }





    }
    setScoreColours();

    function compareCorrectResults(){
      var table = document.getElementById('rsTable'),
      rows = table.rows, rowcount = rows.length, r,
      cells, cellcount, c, cell;
       // th adds +1 to row count
            for(r = 0; r < rowcount; r++) {
                cells = rows[r].cells;
                cellcount = cells.length;
                for(c = 0; c < cellcount; c++) {
                    cell = cells[c];

                      console.log((cell));

                }
            }

    }



});
