var movie = ["Tommy Boy", "Happy Gilmore", "Caddyshack", "Scarface", "Eurotrip", "Animal House", "Avengers", "Batman", "Terminator", "Predator", "Scream", "Ant Man", "Platoon", "Rio Bravo", "Billy Madison", "Roadhouse", "City Slickers", "Rocky"]

// make and display movie buttons
var renderButtons = function () {
    $("#button-display").empty();
    $(movie).each(function (i) {
        var movieButton = $("<button>");
        movieButton.attr("class", "movie_button");
        movieButton.append(movie[i]);
        $("#button-display").append(movieButton);
    });
};
renderButtons();

// when you click an movie button
$(document.body).on("click", ".movie_button", function () {

    // display text
    $("#gif-text").text("Click on a GIF to play/pause");

    // make query url
    var movie = $(this).text();
    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=bwBPIHo6Y1FRKN84ypFKGwl8U0rGKtjW" + movie + "&limit=10";

    // make ajax call
    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function (response) {
        console.log(response);

        // make movie div
        var movieDiv = $("<div class= 'movie_div'>");

        // for each div
        $(response.data).each(function (i) {

            // make gif  div
            var gifDiv = $("<div class= 'gif_div'>");

            // append rating and gifs to gif div
            gifDiv.append("<img src= '" + response.data[i].images.fixed_height_still.url + "' data-still= '" + response.data[i].images.fixed_height_still.url + "' data-animate= '" + response.data[i].images.fixed_height.url + "' data-state= 'still' class= 'gif'>")
            gifDiv.append("<p>Rating: " + response.data[i].rating + "</p>");
            movieDiv.append(gifDiv);
        });

        // display gif and rating
        $("#gif-display").prepend(movieDiv);
    });
});

// play pause function
var playPauseGif = function (state, gif) {
    $(gif).attr("src", $(gif).attr("data-" + state));
    $(gif).attr("data-state", state);
};

// when you click on a gif, play pause gif
$(document.body).on("click", ".gif", function () {
    var state = $(this).attr("data-state");

    if (state === "still") {
        playPauseGif('animate', this);
    }
    else {
        playPauseGif('still', this)
    }

});

// when you click submit
$("#submit").on("click", function () {
    event.preventDefault();

    if ($("#new-movie").val().trim() !== "") {
        // add input to movie
        movie.push($("#new-movie").val().trim());
        renderButtons();

        // reset form
        $("#new-movie").val("");
    };
});
