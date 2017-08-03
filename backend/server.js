let express = require('express'),
    app = express();
let port = 3000;

app.get('/', function (req, res) {
  console.log("Take it back!");
  res.send('Hello!');
});

app.listen(port, function () {
  console.log(`Server listening port: ${port}`);
});