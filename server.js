let express = require('express'),
    app = express();
let ololo = 'olo';
let apiRoutes = express.Router();
let path = require('path');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let passport = require('passport');
let config = require('./config/database'); // get db config file
let User = require('./models/user'); // get the mongoose user model
let Poem = require('./models/poem'); // get the mongoose poem model
let Recycled = require('./models/recycled'); // get the mongoose recycled model
let jwt = require('jwt-simple');
let moment = require('moment');
let mongoose = require('mongoose');
let port = 5000;

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log to console
app.use(morgan('dev'));

app.use('/',express.static('public/main-page'));
app.use('/admin',express.static('public/admin-panel'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/main-page/index.html');
});

app.get('/admin', function (req, res) {
  res.sendFile(__dirname + '/public/admin-panel/index.html');
});

// connect to database
mongoose.connect(config.database, {useMongoClient: true});

// saving a new poem

apiRoutes.post('/savePoem', function(req, res) {
  let newPoem = new Poem({
    title: req.body.title,
    body: req.body.body,
    date: moment(req.body.date)
  });
  let promise = newPoem.save();
  promise
    .then(() => {
      console.log("Data saved on db");
      res.json({success: true, msg: "Вірш збережено в базі даних!"})
    })
    .catch(err => {
      console.log(err);
      res.json({success: false});
    })
});

apiRoutes.put('/editPoem', function(req, res) {
  Poem.findById({_id: req.body.id}, (err, poem) => {
    if (err) {
      console.log(err);
      res.status(500).json({err: "There are some problem with editing of this record"});
    } else  {
      poem.set({
          title: req.body.title,
          body: req.body.body,
          date: req.body.date
        });
      let promise = poem.save();
      promise 
        .then(() => {
          res.json({msg: `Poem saved on DB.`});
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({err: "There are some problem with editing of this record"});
        })
    }
  })
});

apiRoutes.delete('/recycle', function(req, res) {
  let newRecyclePoem = new Recycled({
    title: req.body.title,
    body: req.body.body,
    date: req.body.date
  });

  let promise = newRecyclePoem.save();
  promise
    .then(() => {
      console.log("Data saved on db");
      Poem.findOneAndRemove({_id: req.body.id}, (err, doc) => {
        if (err) {
          console.log(err);
          res.status(500).json({msg: "There are some problem with deleting this item!"})
        } else {
          res.json({msg: `Poem  moved to the recycle.`});
        }
      })
    })
    .catch(err => {
      console.log(err);
      res.json({success: false});
    })
});

apiRoutes.delete('/delete', function(req, res) {
  Recycled.findOneAndRemove({_id: req.body.id}, (err, doc) => {
        if (err) {
          console.log(err);
          res.status(500).json({msg: "There are some problem with deleting this item!"});
        } else {
          res.json({msg: `Poem  deleted from DB.`});
        }
      })
});

apiRoutes.post('/restore', function(req, res) {
  let restoredPoem = new Poem({
      title: req.body.title,
      body: req.body.body,
      date: req.body.date
  });
  let promise = restoredPoem.save();
  promise
    .then(()=>{
      console.log("Data saved on db");
      Recycled.findOneAndRemove({_id: req.body.id}, (err, doc) => {
        if (err) {
          console.log(err);
          res.status(500).json({msg: "There are some problem with deleting this item!"})
        } else {
          res.json({msg: `Poem  moved to the main list.`});
        }
      });
    })
    .catch((err)=>{
      console.log(err);
      res.json({success: false});
    })
})

// to get poems list from DB

apiRoutes.post('/poemsList', function(req, res) {
  console.log('Connecting to DB...');
  Poem.find(function(err, poems) {
    if (err) {
      console.log(err);
    } else {
      res.json({success: true, poemsList: poems});
    }
  })
});

apiRoutes.post('/recycledPoemsList', function(req, res) {
  console.log('Connecting to DB...');
  Recycled.find(function(err, poems) {
    if (err) {
      console.log(err);
    } else {
      res.json({success: true, poemsList: poems});
    }
  })
})


// connect the api routes under /api/*
app.use('/api', apiRoutes);

app.listen(port, function () {
  console.log(`Server listening port: ${port}`);
});