var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
// var redis = require("redis");
// var client = redis.createClient();
var bodyParser = require('body-parser');

var trashcans = [
];

var trashcans_real = [
  {
    id: '1CC3A7',
    lat: 55.374561,
    lng: 10.430558,
    status: "empty",
    lastCheck: 1490367555,
  }
];

var trashcans_fake = [
];

// Used for simulation
var trash_min_long = 10.306957;
var trash_max_long = 10.442885;
var trash_min_lat = 55.362410;
var trash_max_lat = 55.425982;


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
});

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
  trashcans = trashcans_real;
  res.sendFile(__dirname + '/index.html');
});

app.get('/fakeMap', function (req, res) {
  if (trashcans_fake.length === 0) {
    generateFakeTrash();
  }
  trashcans = trashcans_fake;
  res.sendFile(__dirname + '/index.html');
});

function generateFakeTrash() {
  for (var i = 0; i < 200; i++) {
    var tempLat = (Math.random() * (trash_max_lat - trash_min_lat) + trash_min_lat);
    var tempLong = (Math.random() * (trash_max_long - trash_min_long) + trash_min_long);
    trashcans_fake.push(
        {
          name: "trashcan demo2",
          id: i.toString(),
          lat: tempLat,
          lng: tempLong,
          status: Math.random() >= 0.1 ? "empty" : "full",
          lastCheck: 1490367555,
        }
    )
  }
}

app.listen(port, function () {
  console.log("App is running on port " + port);
});
