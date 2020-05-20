

//var queryURL = "https://api.nasa.gov/insight_weather/?api_key=0Fdg2t02UzcsbtZFaOGFAXNB1DINEIsAwaIMe68h&feedtype=json&ver=1.0"

var date = new Date();

function runMars(){
    $.ajax({
        url: "https://api.nasa.gov/insight_weather/?api_key=0Fdg2t02UzcsbtZFaOGFAXNB1DINEIsAwaIMe68h&feedtype=json&ver=1.0",
        method: "GET"
    })

    .then(function(responseMars){
        console.log(responseMars[0]);
        console.log(responseMars["519"].AT.av);
        $("#marFforcasth3").empty();
        var forrecasth3 = $("<h3>").text("mars forecast Weather")
        $("#marFforcasth3").append(forrecasth3)
      
        $(".planetName").text("planets name:  mars")
        $(".marsMaxTemp").text("Max temprature: " + responseMars["519"].AT.mx)
        $(".marsMinTemp").text("Min temprature: " + responseMars["519"].AT.mn)
        $(".marsAvgTemp").text("Avg temprature: " + responseMars["519"].AT.av)
        $("#marsForeCast").empty();
        
        for(var j = 519; j < 524; j++){
            
            var cards = $("<div>").addClass("card col-md-2 ml-4 bg-success text-white");
            var cardBody = $("<div>").addClass("card-body p-3 forecastBody")
            var sol = $("<h4>").text("sol:" + j)
            var maxtemp = $("<p>").text("Max temprature: " + responseMars[j].AT.mx);
            var mintemp = $("<p>").text("Max temprature: " + responseMars[j].AT.mn);
           
    
            
    
          cardBody.append(sol,maxtemp,mintemp)
          cards.append(cardBody)
            $("#marsForeCast").append(cards);
            
        }

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
        console.log(responseLocal);
        console.log(responseLocal.city.name);
        $(".currentDate").text("current date: "+date.toLocaleDateString('en-US'));
        $(".card-title").text("City name: "+responseLocal.city.name)
        $(".card-text").text("temprature: "+responseLocal.list[0].main.temp)
        $(".cardHumidity").text("humidity: "+responseLocal.list[0].main.humidity)

          
        
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
    var forecast = $("<h3>").addClass("forecasth3").text("Earth forecast Weather")
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
          var temperature = $("<p>").text("Temperature: " + tempF + " °F");
          var humidity = $("<p>").text("Humidity: " + results[i].main.humidity + "%");
  
          var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")
         
  
          cardBody.append(cityDate, image, temperature, humidity);
          card.append(cardBody);
          $("#forecast").append(card);
       
  
        }
      }
      
      
      
      })
}






$("#search").on("click", function(){
    event.preventDefault();
   
    runLocalWeather() ;
    getCurrentForecast();
     runMars();
})