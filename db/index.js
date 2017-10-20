let mongoose = require('mongoose');

exports.connect = function (url, done) {
  mongoose.connect(url, { useMongoClient: true, promiseLibrary: global.Promise }, (err) => {
    if (err) {
      return done(err);
    }
    done()
  });
};

exports.db = mongoose.connection;

