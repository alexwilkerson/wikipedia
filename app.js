$(document).ready(function(){

  // this resets the results section
  // when nothing has been displayed
  $("#term").focus(function(){
    var full = $("#results").has("article").length ? true : false;
    if (full === false){
      $("#results").html("<h2 class='searching'>Please enter a search term.</h2>");
    }
  });

  var queryWiki = function() {
    var query = $("#term").val();
    if (query === "") {
      $("#results").html("<h2 class='searching'>Your search cannot be blank.</h2>");
    } else {
      $("#results").html("<h2 class='searching'>Searching Wikipedia...</h2>");
      // crossorigin.me is to fix weird ajax request
      $.getJSON("https://crossorigin.me/http://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=" + encodeURIComponent(query), function(json){
        if (json.query.searchinfo.totalhits === 0) {
          $("#results").html("<h2 class='searching'>Nothing found.</h2>");
        } else {
          $("#results").empty();
          for (var i = 0; i < json.query.search.length; i++){
            $("#results").append("<article class='result'><h2 class='title'><a href='http://en.wikipedia.com/wiki/" + encodeURIComponent(json.query.search[i].title) + "'>" + json.query.search[i].title + "</a></h2><p class='snippet'>" + json.query.search[i].snippet + "</p></article>");
          }
        }
        console.log(json);
      });
    }
  };

  var randomWiki = function() {
    location.href = 'http://en.wikipedia.org/wiki/Special:Random';
  };

  $("#random").click(randomWiki);
  $("#query").click(queryWiki);
  $("#term").keyup(queryWiki);

});
