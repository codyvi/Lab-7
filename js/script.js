$(document).ready(function() {

// Start your code from here
let temas = ["Mario", "Link","Zelda", "Naruto", "Sasuke", "Aang", "Master Chief", "Captain Price"];

for(let i = 0; i < temas.length; i++){
    $("#animal-buttons").append(`<input type="submit" id="temaButton" value="${temas[i]}">`);
}

$("#animal-buttons").on("click", "#temaButton", function(){
    let theme = $("[name=img]");
    let rating = $("[name=rate]");
    let newDiv = $("[name=new-div]");
    let size = theme.length;
    for(let i = 0; i < size; i++){
        theme[i].remove();
    }
    for(let i = 0; i < rating.length; i++){
        rating[i].remove();
    }
    for(let i = 0; i <newDiv.length; i++){
        newDiv[i].remove();
    }

    var req = {
        url: `http://api.giphy.com/v1/gifs/search?q=${this.value}&api_key=RUR53dWJppQKtT8K0hNeWxaFMusjATY9&limit=10`,
        success: function(gifs){
            for(let i = 0; i < gifs.data.length; i++){
                let img = $(`<img alt="${this.value}" name="img">`);
                let rate = $(`<p name="rate"> Rate: ${gifs.data[i].rating}</p>`)
                img.attr("src", gifs.data[i].images.fixed_height_still.url);
                img.attr("data-still", gifs.data[i].images.fixed_height_still.url); 
                img.attr("data-animate", gifs.data[i].images.fixed_height.url);
                img.attr("data-rating", gifs.data[i].rating);
                img.attr("data-inMove", "no");
                img.addClass("theme-item");
                console.log(img);
                //Div para guardar la imagen y rating
                let animalDiv = $("<div name =\"new-div\" class=\"theme-item\">");
                animalDiv.append(img);
                animalDiv.append(rate);

                $("#themes").append(animalDiv);
            }
        },
        error: function(){
            console.log("Error getting the info");
        },

    }
    $.ajax(req);

})

$("body").on("click", ".theme-item", function(e) {
    if ($(this).attr("data-inMove") === "no") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-inMove", "yes");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-inMove", "no");
    }
})

$("#add-animal").on("click", function(e) {
    e.preventDefault();
    var name = $("#animal-input").val();
    $("#animal-buttons").append(`<input type="submit" id="temaButton" value="${name}">`);
})


});
