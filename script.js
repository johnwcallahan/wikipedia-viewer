$(document).ready(function() {

  //Start with entries hidden
  $("#entries").hide();

  //Search when user presses Go button
  $("#search").click(function() {
    search();
  });

  //Search when user presses enter
  $("#input").keypress(function(event) {
    if (event.which == 13)
      search();
  });

  function search() {
    //If entries already exist, they fade out so they can reappear with new data
    $("#entries").fadeOut(200);

    //Search bar moves to top of page
    $("#nav").animate({
      marginTop: '0px'
    }, 500);

    //Get data from Wikipedia API and display
    var input = $("#input").val();
    var url = "https://en.wikipedia.org/w/api.php?action=query&format=json" +
      "&prop=extracts&list=&generator=search&exsentences=1&exintro&" +
      "explaintext&exlimit=10&gsrnamespace=0&gsrlimit=10&gsrsearch=" +
      input + "&callback=?";
    $.getJSON(url, function(data) {
      var count = 1;
      for (var key in data.query.pages) {
        $("#entry" + count).html("<h4>" + data.query.pages[key].title +
          "</h4>" + "<p>" + data.query.pages[key].extract + "</p>");
        $("#entry" + count).attr("href",
          "https://en.wikipedia.org/wiki/?curid=" + key);
        $("#entries").fadeIn(300);
        count += 1;
      }
    });
  }
});