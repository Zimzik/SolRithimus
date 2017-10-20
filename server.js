// nmp modules
let express = require('express'),
    app = express();
let apiRoutes = express.Router();
let openRouter = express.Router();
let authRouter = express.Router();
let path = require('path');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let passport = require('passport');
let jwt = require('jwt-simple');
let moment = require('moment');
let mongoose = require('mongoose');

// own modules
let config = require('./config'); // get db config file
let User = require('./models/user'); // get the mongoose user model
let Poem = require('./models/poem'); // get the mongoose poem model
let db = require('./db');
let UserController = require('./controllers').user;
let PoemController = require('./controllers').poem;

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


//auth validation
authRouter.use(UserController.validation);

//user registration
openRouter.post('/register', UserController.register);

// user authorization
openRouter.post('/auth', UserController.auth);

// enter admin panel validation

authRouter.post('/userinfo', UserController.userinfo);

// change user password

authRouter.post('/changepass', UserController.changePass);

/******************************************/
// saving a new poem

authRouter.post('/savePoem', PoemController.savePoem);

authRouter.put('/editPoem', PoemController.editPoem);

authRouter.delete('/recycle', PoemController.recycle);

authRouter.delete('/delete', PoemController.delete);

authRouter.post('/restore', PoemController.restore);

// to get poems list from DB

authRouter.post('/poemsList', PoemController.poemsList);

authRouter.post('/recycledPoemsList', PoemController.recycledPoemsList);

// connect the api routes under /api/*
app.use('/api', apiRoutes);

app.use('/open', openRouter);
app.use('/auth', authRouter);


// connect to database
  
db.connect(config.db, (err) => {
  if (err) {
    console.log(err)
  } else {
    app.listen(config.port, () => {
      console.log(`Server listening port 5000`);
    });
  }
});

