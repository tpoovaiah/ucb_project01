

//var queryURL = "https://api.nasa.gov/insight_weather/?api_key=0Fdg2t02UzcsbtZFaOGFAXNB1DINEIsAwaIMe68h&feedtype=json&ver=1.0"

var date = new Date();


function runMars(){
    $.ajax({
        url: "https://api.nasa.gov/insight_weather/?api_key=0Fdg2t02UzcsbtZFaOGFAXNB1DINEIsAwaIMe68h&feedtype=json&ver=1.0",
        method: "GET"
    })

    .then(function(responseMars){
        console.log("response mars 0", responseMars.sol_keys[0]);
        console.log("response mars 519", responseMars[responseMars.sol_keys[0]].AT.av);
        $("#marFforcasth3").empty();
        var forrecasth3 = $("<h3>").text("Mars Weather Forecast")
        $("#marFforcasth3").append(forrecasth3)
      
        $(".planetName").text("Planet: Mars")
        $(".marsMaxTemp").text("Max temp: " + responseMars[responseMars.sol_keys[0]].AT.mx + " °F")
        $(".marsMinTemp").text("Min temp: " + responseMars[responseMars.sol_keys[0]].AT.mn + " °F")
        $(".marsAvgTemp").text("Avg temp: " + responseMars[responseMars.sol_keys[0]].AT.av + " °F")
        $("#marsForeCast").empty();

        
        
        for (var j = 0; j < 5; j++){
            
            var cards = $("<div>").addClass("card col-md-2 ml-4 bg-success text-white");
            var cardBody = $("<div>").addClass("card-body p-3 forecastBody")
            var sol = $("<h4>").text("Sol:" + responseMars.sol_keys[j])
            var maxtemp = $("<p>").text("Max temp: " + responseMars[responseMars.sol_keys[j]].AT.mx + " °F");
            var mintemp = $("<p>").text("Min temp: " + responseMars[responseMars.sol_keys[j]].AT.mn + " °F");
           
    
            
    
          cardBody.append(sol,maxtemp,mintemp)
          cards.append(cardBody)
            $("#marsForeCast").append(cards);
            
        }

    })
}

function runLocalWeather() {

    var userInput = $("#cityName").val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?appID=18e8d96494d93797eebb6e49b5194ab5&q=" + userInput;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(responseLocal){
        console.log(responseLocal);
        console.log(responseLocal.city.name);
        var temp = (responseLocal.list[0].main.temp - 273.15) * 1.80 + 32;
        var tempF = Math.floor(temp);
        $(".currentDate").text("Current Date: "+date.toLocaleDateString('en-US'));
        $(".card-title").text("City: "+responseLocal.city.name)
        $(".card-text").text("Temp: "+tempF + " °F")
        $(".cardHumidity").text("Humidity: "+responseLocal.list[0].main.humidity)

          
        
    })
}
function getCurrentForecast(){
    var city = $("#cityName").val();
    console.log(city);
    var  apiKey = "&appid=e5a12255ed7addfc305fdbdf86dcd1db";
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
        method: "GET"
      }).then(function (response){
    
        console.log(response);
        var results = response.list;
         
    $('#forecast').empty();
    $("#forcasth3").empty();
    var forecast = $("<h3>").addClass("forecasth3").text("Earth Weather Forecast")
    $("#forcasth3").append(forecast)
        
       
    
    for (var i = 0; i < results.length; i++) {
     
        console.log(results[i].dt_txt.indexOf("12:00:00"))
  
        if(results[i].dt_txt.indexOf("12:00:00") !== -1){
            var day = results[i].dt_txt.split(' ')[0];
          // get the temperature and convert to fahrenheit 
    var temp = (results[i].main.temp - 273.15) * 1.80 + 32;
    var tempF = Math.floor(temp);
         
          var card = $("<div>").addClass("card col-md-2 ml-4 bg-info text-white");
          var cardBody = $("<div>").addClass("card-body p-3 forecastBody")
          var cityDate = $("<h4>").addClass("card-title").text(day);
          var temperature = $("<p>").text("Temp: " + tempF + " °F");
          var humidity = $("<p>").text("Humidity: " + results[i].main.humidity + "%");
  
          var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")
         
  
          cardBody.append(cityDate, image, temperature, humidity);
          card.append(cardBody);
          $("#forecast").append(card);
       
  
        }
      }
      
      
      
      })
}

function displayMars(){
    var earthDate = moment().format().split("", 10).join("");
    var queryURL= "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=0Fdg2t02UzcsbtZFaOGFAXNB1DINEIsAwaIMe68h&earth_date=" + earthDate

    //console.log("earthDate", earthDate)
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then (function(response){
        console.log("Mars Picture",response)
        
        $("body").css("background-image", "url(" + response.photos["0"].img_src + ")");
        $("body").css("background-repeat", "no-repeat")
        $("body").css("background-size", "cover")
    })

}






$("#search").on("click", function(){
    event.preventDefault();
   
    runLocalWeather() ;
    getCurrentForecast();
     runMars();
     displayMars();
     hide();
})





function displayMars(){
    var earthDate = moment().format().split("", 10).join("");
    var queryURL= "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=0Fdg2t02UzcsbtZFaOGFAXNB1DINEIsAwaIMe68h&earth_date=" + earthDate

    console.log("earthDate", earthDate)
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then (function(response){
        console.log("Mars Picture",response)
        
        $("body").css("background-image", "url(" + response.photos["0"].img_src + ")");
        $("body").css("background-repeat", "no-repeat")
        $("body").css("background-size", "cover")
    })

}


function hide(){
   $(".hide").removeClass("hide")
}