let express = require('express'),
    app = express();
let router = express.Router();
let mongoose = require('mongoose');
let port = 5000;

app.use('/',express.static('public/main-page/dist'));
app.use('/admin',express.static('public/admin-panel/dist'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/main-page/dist/index.html');
});

app.get('/admin', function (req, res) {
  res.sendFile(__dirname + '/public/admin-panel/dist/index.html');
});

app.get('/ololo', function (req,res) {
  console.log('Ololo!');
});

app.listen(port, function () {
  console.log(`Server listening port: ${port}`);
});