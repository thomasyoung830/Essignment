var express = require('express'),
    app = express();

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

// serve index file
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('server started on localhost:3000');
});