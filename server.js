var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
// var redis = require("redis");
// var client = redis.createClient();
var bodyParser = require('body-parser');

var trashcans = [
  {
    name: "trashcan demo",
    id: '1CC3A6',
    lat: 55.385934,
    lng: 10.403766,
    status: "empty",
    lastCheck: 1490367555,
  },
  {
    name: "trashcan demo2",
    id: '1CC3A7',
    lat: 55.395425,
    lng: 10.385417,
    status: "empty",
    lastCheck: 1490367555,
  }
];

// client.set("trashcans", JSON.stringify(trashcans));


// client.on("error", function (err) {
//    console.log("Error " + err);
// });

app.use(express.static('static'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    res.send(JSON.parse(JSON.stringify(trashcans)))
});

app.post('/empty', function(req, res) {
  for (var i = 0; i < trashcans.length; i++) {
    if (trashcans[i].id === String(req.body.id)) {
      trashcans[i].status = "empty";
    }
  }
  res.send('OK');

})

app.get('/call', function (req, res) {
  console.log("new callback");
  for (var i = 0; i < trashcans.length; i++) {
    if (trashcans[i].id === String(req.query.id)) {
      trashcans[i].status = "full";
      trashcans[i].lastCheck = req.query.time;
    }
  }
  console.log(req.query.id, req.query.time, req.query.lat, req.query.lng);
  // 1CC3A6 1490367555 55.0 10.0
  res.send('OK');
});

app.get('/map', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, function () {
  console.log("App is running on port " + port);
});
