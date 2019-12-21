// //<!DOCTYPE html>
// <html lang="en">

// <head>
//   <meta charset="utf-8">
//   <title>Bujumbura Data</title>
// </head>

// <body>  
//   <!-- Retrieved data will be dumped here -->
//   <div class="city"></div>
//   <div class="wind"></div>
//   <div class="humidity"></div>
//   <div class="temp"></div>
//   <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
//   <script type="text/javascript">
//     // This is our API key. Add your own API key between the ""
//     var APIKey = "166a433c57516f51dfab1f7edaed8413";

//     // Here we are building the URL we need to query the database
//     var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=" + APIKey;

//     // We then created an AJAX call
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(function(response) {

//       console.log(queryURL);
//       console.log(response);
//       $(".city").html(response.name);
//       $(".wind").text(response.wind.speed);
//       $(".humidity").text("humidity"+response.main.humidity);
//       $(".temp").text("tem"+response.main.temp);
//        var tempF = (response.main.temp-273.15)*1.80+31;
//        $(".temp").text(tempF);

//       // Create CODE HERE to Log the queryURL
//       // Create CODE HERE to log the resulting object
//       // Create CODE HERE to transfer content to HTML
//       // Create CODE HERE to calculate the temperature (converted from Kelvin)
//       // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
//       // Create CODE HERE to dump the temperature content into HTML
// api.openweathermap.org/data/2.5/weather?lat=35&lon=139
// api.openweathermap.org/data/2.5/weather?zip=94040,us

// var date = new Date(unix_timestamp*1000);
//     });
//   </script>
// </body>

// </html> 
// JSON.parse(localStorage.getItem("searchHistory"))
// var searchHistoryObject={};
var myLocation;
var searchHistoryObject ;
var searchHisoryObject;
if(localStorage.getItem("searcHistoryObject")){
  searchHistoryObject = JSON.parse(localStorage.getItem("searcHistory"))
  searchHistory=searchHistoryObject.array;
}else{
  searchHistoryObject= {};
  searchHistory=[];

};  
var APIKey = "166a433c57516f51dfab1f7edaed8413";
var queryURL;
var cityInput;
var countryInput;
var longetudeInput;
var latitudeInput;
var zipInput;
var weatherImage;


// var todayTime=new Date();
// alert(todayTime);

$(document).ready(function(){
  searchHistoryObject= JSON.parse(localStorage.getItem("searchHistoryObject"));
  searchHistory=searchHistoryObject.array;
  deployHistory()});
function cityInput(event){
  event.preventDefault();
  event.stopPropagation();
cityInput = $(".cityInput").val();
countryInput =$(".countryInput").val();
zipInput=$(".zipCode").val();
longetudeInput=$(".longetude").val();
latitudeInput=$(".lattitude").val();
//calls the API address for the 5day forecast
displayInfo();}
function DisplayFiveDays(){
  $("#fiveDayHolder").empty();
  if(zipInput){
    queryURL="https://api.openweathermap.org/data/2.5/forecast?zip="+zipInput+",us&appid="+APIKey
  }
  else if(longetudeInput&&latitudeInput){
    queryURL="https://api.openweathermap.org/data/2.5/forecast?lat"+latitudeInput+"&lon="+longetudeInput+"&appid="+APIKey
  }
 else if(cityInput&&countryInput==""){
   queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityInput+" &appid=" + APIKey;alert(queryURL);}
 else if(cityInput&&countryInput){
  queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityInput+","+countryInput+"&appid=" + APIKey;alert(queryURL);}
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    for (var i =2;i<=34;i+=8){
      
      var futureDayDiv = $("<div>");
      futureDayDiv.addClass("futureDayDiv");
      
          var futuredayDateSecondAdjusted= response.list[i].dt+response.city.timezone;
          // console.log("futuredaySeconds"+futuredayDateSecondAdjusted);
          var futureDaytoString=new Date(futuredayDateSecondAdjusted*1000).toDateString();
          futureDaytoString=moment.utc(futureDaytoString).format("LL");
          var futureDate = $("<div>");
          futureDate.addClass("futureDayTextDisplay");
          futureDate.html(futureDaytoString);
          // console.log("fate to String"+futureDaytoString);
      var futureRainOrShine=$("<div>");
      futureRainOrShine.addClass("futureDayTextDisplay");
      futureRainOrShine.html("Weather : " + response.list [i].weather[0].main);
      
       var futureWind= $("<div>");
       futureWind.addClass("futureDayTextDisplay");
       futureWind.html("Wind Speed = "+ response.list[i].wind.speed);
       var futureImage = $("<div>");
       if (response.list[i]. weather[0].main==="Rain"){
          var weatherImagesmall = $("<img src='assets/img/rain.png'>")
         futureImage.append(weatherImagesmall);
       }
       else if (response.list[i]. weather[0].main==="Snow"){
        var weatherImagesmall = $("<img src='assets/img/snow.png'>")
         futureImage.append(weatherImagesmall);
       }
        else if(response.list[i]. weather[0].main==="Clear"){
          var weatherImagesmall = $("<img src='assets/img/sun.png'>")
         futureImage.append(weatherImagesmall);   
        }
        else if(response.list[i]. weather[0].main==="Clouds"){
          var weatherImagesmall = $("<img src='assets/img/cloud.png'>")
         futureImage.append(weatherImagesmall);
        }
       futureImage.addClass("futureDayImageDisplay");
       futureDayDiv.append(futureDate,futureRainOrShine,futureWind,futureImage);
       $("#fiveDayHolder").append(futureDayDiv);
    }


//creates the 

}
  )}

  function saveHistory(response){
    // alert("heeeyy")
    if (searchHistory===null){
      return null
    };
    var savedCity={"name":response.name,
              "info":response};
    searchHistory.push(savedCity);
    var historyLength =searchHistory.length;
    if(historyLength>5){
      for(var i=0;i<5;i++){
     var searchHistoryTemp=searchHistory[i+1];
     searchHistory[i]=searchHistoryTemp;
    };
    searchHistory.splice(5,1);
    console.log("Helooooooooserch")
    console.log(searchHistory);
    }
    
    searchHistoryObject={"array":searchHistory};
    // console.log(searchHistoryObject);

    localStorage.setItem("searchHistoryObject",JSON.stringify(searchHistoryObject) );
    searchHistoryObject= JSON.parse(localStorage.getItem("searchHistoryObject"));
    searchHistory=searchHistoryObject.array;
    // console.log("Heloooooooo2");
    // console.log(searchHistory);
  }
  function deployHistory(){
    if (searchHistory!==null){
    $("#historyContainer").empty();
    
    for(var i=0; i<searchHistory.length; i++){
      var newBubble = $("<div>");
      newBubble.addClass("bubble");
      newBubble.attr("value",i);
      var historyCityName = $("<div>");
      historyCityName.addClass("historyCityName");
      historyCityName.html(searchHistory[i].name);
      newBubble.append(historyCityName);
      $("#historyContainer").append(newBubble);
      
      

    }
  }}
function showHistoryWeather(event){
  
  

  event.stopPropagation();
  event.preventDefault();
  // alert("showhistory");
var historyValue=$(this).attr("value");
console.log(historyValue);
  var lon = searchHistory[historyValue].info.coord.lon;
  // console.log("logetude");
  // console.log(lon);
  var lat =searchHistory[historyValue].info.coord.lat;
  // console.log(lat);
  queryURL="https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+APIKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // console.log(queryURL);
    console.log(response);
    $(".cityAndCountry").text(response.name + response.sys.country);
    $(".wind").text("windspeed :"+response.wind.speed);
    $(".humidity").text("humidity :"+response.main.humidity);
     var tempF = Math.floor((response.main.temp-273.15)*1.80+31);
     $(".temperature").text("temperature :"+tempF+"F");
     var localHours = response.dt+response.timezone;
    //  alert("localhours!"+localHours);

     var localDay = new Date(localHours*1000).toUTCString();
     localDay=moment.utc(localDay).format("LT");
    

      $(".locationTIme").text(localDay);
      var localWeather=response.weather[0].main;
      $(".rainSunSnowCloud").text("weather:" + localWeather);

      if (response.weather[0].main=="Rain"){
         
        $("#windowImage").html("<img src='assets/img/rain.png'>");
      }
      else if (response. weather[0].main=="Snow"){
        $("#windowImage").html("<img src='assets/img/snow.png'>")
      }
       else if(response. weather[0].main=="Clear"){
        $("#windowImage").html("<img src='assets/img/sun.png'>") 
       }
       else if(response. weather[0].main=="Clouds"){
        $("#windowImage").html("<img src='assets/img/cloud.png'>")
       }

       if(response.dt<=response.sys.sunset&&response.dt>=response.sys.sunrise){
         $("#windowRound").attr("style","background-color:skyblue")
       }
       else{$("#windowRound").attr("style","background-color:black")};



})};
// function ddada(event){
//   event.stopPropagation();
//   event.preventDefault();
  
//   alert("dadada");
// };

  
  // var x = document.getElementById("demo");
  // function getLocation() {
  //     if (navigator.geolocation) {
  //         navigator.geolocation.getCurrentPosition(showPosition);
  //     } else { 
  //         x.innerHTML = "Geolocation is not supported by this browser.";
  //     }
  // }

  // function showPosition(position) {
  //     x.innerHTML = "Latitude: " + position.coords.latitude + 
  //                   "<br>Longitude: " + position.coords.longitude;    
//  
  
    // function getLocation(){
    //   if (navigator.geolocation){
    //     navigator.geolocation.getCurrentPosition(openWindow);
    //   }
    //   else(alert("no geolocation"));
    // }
   


  
    $(document).on("click",".bubble",showHistoryWeather);
    // $(document).on("click",".bubble",ddada);
  

  $("#openWindow").on("click",openWindow);
  // $("div :last-child").remove();
//calls the API address and deploy the informatiom to the window
function displayInfo(){
  
  $("#windowImage").empty();
 if(zipInput){
   queryURL="https://api.openweathermap.org/data/2.5/weather?zip="+zipInput+",us&appid="+APIKey
 }
 else if(longetudeInput&&latitudeInput){
   queryURL="https://api.openweathermap.org/data/2.5/weather?lat="+latitudeInput+"&lon="+longetudeInput+"&appid="+APIKey
 }
else if(cityInput&&countryInput==""){
  queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityInput+" &appid=" + APIKey;alert(queryURL);}
else if(cityInput&&countryInput){
 queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityInput+","+countryInput+"&appid=" + APIKey;alert(queryURL);}

$.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
    
          // console.log(queryURL);
          console.log(response);
          $(".cityAndCountry").text(response.name + response.sys.country);
          $(".wind").text("windspeed :"+response.wind.speed);
          $(".humidity").text("humidity :"+response.main.humidity);
           var tempF = Math.floor((response.main.temp-273.15)*1.80+31);
           $(".temperature").text("temperature :"+tempF+"F");
           var localHours = response.dt+response.timezone;
          //  alert("localhours!"+localHours);

           var localDay = new Date(localHours*1000).toUTCString();
           localDay=moment.utc(localDay).format("LT");
          

            $(".locationTIme").text(localDay);
            var localWeather=response.weather[0].main;
            $(".rainSunSnowCloud").text("weather:" + localWeather);

            if (response.weather[0].main=="Rain"){
               
              $("#windowImage").html("<img src='assets/img/rain.png'>");
            }
            else if (response. weather[0].main=="Snow"){
              $("#windowImage").html("<img src='assets/img/snow.png'>")
            }
             else if(response. weather[0].main=="Clear"){
              $("#windowImage").html("<img src='assets/img/sun.png'>") 
             }
             else if(response. weather[0].main=="Clouds"){
              $("#windowImage").html("<img src='assets/img/cloud.png'>")
             }

             if(response.dt<=response.sys.sunset&&response.dt>=response.sys.sunrise){
               $("#windowRound").attr("style","background-color:skyblue")
             }
             else($("#windowRound").attr("style","background-color:black"));
            saveHistory(response);
            deployHistory(saveHistory);

            


          
        });
        
        };
      


$("#choiceForm").on("submit",cityInput);
$("#choiceForm").on("submit",DisplayFiveDays);

// $("")


//  var offset=parseInt(response.timezone);
          //  var localTime=today.setSeconds(today.getSeconds()+offset);
          //  new Date(SECONDS * 1000).toISOString().substr(11, 8);
          //  alert(localTime);
          //  var localTimeSeconds = new Date(localTime*1000).toLocaleTimeString();
          //  alert("localtimeseconds"+localTimeSeconds);
          //  var localTimeParsed =moment.duration(localTimeSeconds,'seconds');
          //  var localTimeFormated=localTimeParsed.format("hh:mm");
// function sec2time(timeInSeconds) {
//   var pad = function(num, size) { return ('000' + num).slice(size * -1); },
//   time = parseFloat(timeInSeconds).toFixed(3),
//   hours = Math.floor(time / 60 / 60),
//   minutes = Math.floor(time / 60) % 60,
//   seconds = Math.floor(time - minutes * 60),
//   milliseconds = time.slice(-3);

  // return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2) + ',' + pad(milliseconds, 3);
            // (new Date(1425909686)).toLocaleTimeString()
            // var seconds = 3820;
// var duration = moment.duration(seconds, 'seconds');
// var formatted = duration.format("hh:mm:ss");

