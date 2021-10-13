const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended : true})) ;

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html" ) ;
})

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "ce5575bf77e73b7f0d9903a4c555347b";
  const unit = "metric";
  url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey +"&units=" + unit +"";
  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp ;
      console.log(temp);
      const desc = weatherData.weather[0].description ;
      console.log(desc);
      const icon = weatherData.weather[0].icon ;
      const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png" ;
      res.write("<h1>The temperature in " + query +" is " + temp + " degrees celcius</h1>");
      res.write("<h3>The weather is " + desc + "</p>");
      res.write("<img src=" +imageURL +">");
      res.send();
    })
  })
});



app.listen(3000, function() {
  console.log("server started");
})
