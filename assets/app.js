$(document).ready(function(){

    var instruments = [];


    function displayInstrument() {

        var u = $(this).data("search");

        console.log(u)

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + u + "&api_key=MyXPVASPSwjUpqD3NaBJWwg9TNG3gqQZ&limit=10";

        console.log(queryURL)

        $.ajax({
            url: queryURL,
            method: "GET"
        })
          .done(function(response) {

              var results = response.data;

              for (var i = 0; i < results.length; i++) {
               
                var gifDiv = $("<div>");

                var rating = results[i].rating;

                var defaultAnimatedSrc = results[i].images.fixed_height.url;

        	    var staticSrc = results[i].images.fixed_height_still.url;

                var p = $("<p>").text("Rating: " + rating);

                var instrumentImage = $("<img>");

                instrumentImage.attr("src", staticSrc);
        	    instrumentImage.addClass("show");
        	    instrumentImage.attr("data-state", "still");
        	    instrumentImage.attr("data-still", staticSrc);
                instrumentImage.attr("data-animate", defaultAnimatedSrc);
                instrumentImage.attr("src", results[i].images.fixed_height.url);

                gifDiv.prepend(p);

                gifDiv.prepend(instrumentImage);

                $("#gif-here").prepend(gifDiv);
            }
        });  
    }
    
    $("#addInst").on("click", function(event){

        event.preventDefault();

        var newInst = $("#instrumentinput").val().trim();

        instruments.push(newInst)
        console.log(instruments)

        $("#instrumentinput").val('');

        displayButtons();
    });

    function displayButtons(){

        $("#new-buttons").empty();

        for(var i = 0; i < instruments.length; i++){

            var a = $('<button class="btn btn-primary">');

            a.attr("id", "show");
            a.attr("data-search", instruments[i]);
            a.text(instruments[i]);
            $("#new-buttons").append(a);
        }

    }

    displayButtons()

    $(document).on("click", "#show", displayInstrument);

    $(document).on("click", ".show", pauseGif);
    // function renderButtons(){

    //     $("#buttons-view").empty();

    //     for (var i = 0; i < instruments.length; i++) {

    //         var a = $("<button>");    

    //         a.addClass("inst-btn");

    //         a.attr("data-name", instruments[i]);

    //         a.text(instruments[i]);

    //         $("#buttons-view").append(a);

    //     }

    // }

    // $("#add-instrument").on("click", function(event){

    //     event.preventDefault();

    //     var u = $("#instrument-input").val().trim();

    //     instruments.push(u);

    //     renderButtons();
    // });

    function pauseGif() {

        var state = $(this).attr("data-state")

        if(state === "still"){
            var animate = $(this).attr("data-animate");
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
          }else{
            var still = $(this).attr("data-still");
            $(this).attr("src", still);
            $(this).attr("data-state", "still")
          }
    }
    // $(document).on("click", ".movie-btn", displayInstrument);

    // renderButtons();


});