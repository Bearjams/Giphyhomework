$(document).ready(function(){

    var instruments = [];

    $("button").on("click", function() {

        var u = $(this).attr("data-instrument");

        console.log(u)

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + u + "&api_key=MyXPVASPSwjUpqD3NaBJWwg9TNG3gqQZ&limit=10";

        console.log(queryURL)

        $.ajax({
            url: queryURL,
            method: "GET"
        })
          .then(function(response) {

              var results = response.data;

              for (var i = 0; i < results.length; i++) {
               
                var gifDiv = $("<div>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var instrumentImage = $("<img>");

                instrumentImage.attr("src", results[i].images.fixed_height.url);

                gifDiv.prepend(p);

                gifDiv.prepend(instrumentImage);

                $("#gif-here").prepend(gifDiv);
            }
        });  









    });









});