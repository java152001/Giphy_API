var list = ["Kitties", "Puppers", "Otters", "Chickadees"];

var url;



renderButtons();


$(document).on("click", ".searchButton", displayGifs) 

$(document).on("click", ".generatedImage", animateStill);

$("#addTo").on("click", function(event) {
    event.preventDefault();

    $("#buttonSpot").empty();

    var newCritter = $("#critter-input").val().trim();

    list.push(newCritter);

    renderButtons();

})

function renderButtons() {

    var newButton;

    for (i = 0; i < list.length; i++) {
        newButton = $("<button>");
        newButton.attr("class", "searchButton");
        newButton.attr("data-name", list[i]);
        newButton.text(list[i]);
        $("#buttonSpot").append(newButton);
    }
}

function displayGifs() {
    var searchTerm;
    var newImage;
    
    searchTerm = $(this).attr("data-name");

    url = "http://api.giphy.com/v1/gifs/search?api_key=Lkmg2eO5k7a3ZjYjRXDoKRfxoRCd02aF&q=" + searchTerm
    + "&limit=10";

    $.ajax({
        url: url,
        method: "GET"
      }).then(function(response) {
        for (j = 0; j < response.data.length; j++) {
            newImage = $("<img>");
            newImage.attr("class", "generatedImage")
            newImage.attr("src", response.data[j].images.fixed_width_still.url);
            newImage.attr("data-still", response.data[j].images.fixed_width_still.url);
            newImage.attr("data-animate", response.data[j].images.fixed_width.url);
            newImage.attr("data-state", "still");
            $("#gifSpot").prepend(newImage);
        }
      });
}

function animateStill() { 
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still")
    }
}

