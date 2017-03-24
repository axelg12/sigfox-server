var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/call', function (req, res) {
  res.send('Callback')
})


app.listen(port, function () {
  console.log("App is running on port " + port);
});
