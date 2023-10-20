const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const _ = require('lodash');
const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render("index.ejs");
});

app.post("/", (req, res) => {
    let cityName = req.body.cityInput;
    cityName = _.capitalize(cityName);
    let apiKey = "a85d567210f10feb77bc6455a769c91d";
    let unit = "metric";
    
    let url= "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units="+ unit + "&appid=" + apiKey;
    https.get(url, function(response) {
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            let icon = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
            console.log(icon);
            // res.write("<p><h1>The temperature in " + cityName + " is <strong>" + temperature + "*C</strong></h1></p>");
            // res.write("<img src=" + icon + ">");
            // res.send();

            res.render("results", {city: cityName, temp: temperature, image: icon});
            
            
    });
    });
    
});

app.get("/home", function(req, res){
    res.redirect("/");
});

app.listen(port, function () {
    console.log("Server started at port " + port);
});