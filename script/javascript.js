
$( document ).ready(function() {

  $(".results-table tr:nth-child(1) td:nth-child(2)").css("background","rgba(238, 83, 80, 0.5)");
  $(".results-table tr:nth-child(1) td:nth-child(3)").css("background","rgba(238, 83, 80, 0.5)");
  $(".results-table tr:nth-child(1) td:nth-child(4)").css("background","rgba(238, 83, 80, 0.5)");

  $(".results-table tr:nth-child(2) td:nth-child(2)").css("background","rgba(224, 224, 224, 0.5)");
  $(".results-table tr:nth-child(2) td:nth-child(3)").css("background","rgba(224, 224, 224, 0.5)");
  $(".results-table tr:nth-child(2) td:nth-child(4)").css("background","rgba(224, 224, 224, 0.5)");

  $(".results-table tr:nth-child(3) td:nth-child(2)").css("background","rgba(224, 224, 224, 0.5)");
  $(".results-table tr:nth-child(3) td:nth-child(3)").css("background","rgba(224, 224, 224, 0.5)");
  $(".results-table tr:nth-child(3) td:nth-child(4)").css("background","rgba(224, 224, 224, 0.5)");

  $(".results-table tr:nth-child(4) td:nth-child(2)").css("background","rgba(102, 237, 90, 0.5)");
  $(".results-table tr:nth-child(4) td:nth-child(3)").css("background","rgba(238, 83, 80, 0.5)");
  $(".results-table tr:nth-child(4) td:nth-child(4)").css("background","rgba(238, 83, 80, 0.5)");

  $(".results-table tr:nth-child(5) td:nth-child(2)").css("background","rgba(224, 224, 224, 0.5)");
  $(".results-table tr:nth-child(5) td:nth-child(3)").css("background","rgba(224, 224, 224, 0.5)");
  $(".results-table tr:nth-child(5) td:nth-child(4)").css("background","rgba(224, 224, 224, 0.5)");

  $(".results-table tr:nth-child(6) td:nth-child(2)").css("background","rgba(224, 224, 224, 0.5)");
  $(".results-table tr:nth-child(6) td:nth-child(3)").css("background","rgba(224, 224, 224, 0.5)");
  $(".results-table tr:nth-child(6) td:nth-child(4)").css("background","rgba(224, 224, 224, 0.5)");


   var today = new Date();
   var dd = today.getDate();
   var mm = today.getMonth()+1;

   console.log(dd +" "+ mm);

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



});
