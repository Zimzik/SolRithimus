let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcryptjs');
let jwt = require('jwt-simple'); // used to create, sign, and verify tokens
let config = require('../config');

// set up a mongoose model
let UserSchema = new Schema({
  name: {
        type: String,
        unique: true,
        required: true
    },
  password: {
        type: String,
        required: true
    }
});
 
UserSchema.pre('save', function (next) {
    let user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
 
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

let User = mongoose.model('User', UserSchema);

exports.validation = function (req, cb, cb2, cb3) {
	let token = req.body.token || req.query.token || req.headers['x-access-token'];
	let decoded;
	try {
		decoded = jwt.decode(token, config.secret);
	} catch (err) {
		cb(err);
	}
	if (decoded) {
		if (decoded.name) {
			User.findOne({
				name: decoded.name
			}, (err) => {
				cb2(err, decoded.name)
			})
		} else {
			cb3();
		}
	} else {
		cb3();
	}

}

exports.userinfo = function(user, cb) {
  cb(user);
}

exports.register = function (user, cb) {
  // create a sample user
  let sampleUser = new User({
    name: user.name,
    password: user.password
  });
  // save the sample user
  sampleUser.save((err) => {
    cb(err);
  });
};

exports.auth = function (name, cb) {
  // find the user
  User.findOne({name: name}, (err, doc) => {
    cb(err, doc);
  });
};

exports.changePass = function (req, cb, cb2, cb3, cb4) {
	User.findOne({
		name: req.user
	}, (err, user) => {
		if (err) {
			cb();
		} else {
			user.comparePassword(req.body.oldPass, function (err, isMatch) {
				if (isMatch && !err) {
					user.set({
						password: req.body.newPass
					});
					user.save((err) => {
						if (err) {
							cb2(err);
						} else {
							cb3(user);
						}
					})
				} else {
					cb4();
				}
			})
		}
	})
}
