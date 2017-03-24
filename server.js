var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/call', function (req, res) {
  console.log("new callback");
  console.log(req.query.id, req.query.time, req.query.lat, req.query.lng);
  res.send("OK")
})


app.listen(port, function () {
  console.log("App is running on port " + port);
});
