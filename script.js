

//var queryURL = "https://api.nasa.gov/insight_weather/?api_key=0Fdg2t02UzcsbtZFaOGFAXNB1DINEIsAwaIMe68h&feedtype=json&ver=1.0"


function runMars(){
    $.ajax({
        url: "https://api.nasa.gov/insight_weather/?api_key=0Fdg2t02UzcsbtZFaOGFAXNB1DINEIsAwaIMe68h&feedtype=json&ver=1.0",
        method: "GET"
    })

    .then(function(responseMars){
        console.log("marsTemp", responseMars["516"].AT.av);

    })
}

function runLocalWeather() {

    var userInput = $("#cityName").val().trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?appID=18e8d96494d93797eebb6e49b5194ab5&q=" + userInput;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(responseLocal){
        console.log("localTemp", responseLocal.list[0].main.temp)
    })
}

function createMarsForecast(responseLocal) {
    var card = $("<div>").text(responseLocal.list[0].main.temp);
}



$("#search").on("click", function(){
    event.preventDefault();
    runMars();
    runLocalWeather();
})