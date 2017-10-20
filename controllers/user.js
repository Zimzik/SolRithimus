let User = require('../models').User;
let jwt = require('jwt-simple'); // used to create, sign, and verify tokens
let config = require('../config');

exports.validation = function (req, res, next) {
	User.validation(req, (err) => {
			return res.status(403).send('Token Error');
		},
		(err, name) => {
			if (err) {
				return res.status(403).send('This user is not found');
			}
			req.user = name;
			next()
		}, () => {
			return res.status(403).send('Bad token or user not exist.');
		})
}

exports.userinfo = function(req, res) {
  User.userinfo(req.user, (user) => {
    res.json({success: true, name: user});
  })
}


exports.register = function (req, res) {
  User.register(req.body, (err) => {
    if (err) {
      return res.json({success: false, msg: err});  //'Username already exists.'
    }

    console.log('User saved successfully');
    res.json({ success: true, msg: 'Нового користувача успішно створено.' });
  })
};

exports.auth = function (req, res) {
  User.auth(req.body.name, (err, user) => {
    if (err) return res.json({success: false, msg: err});

    if (!user) {
      res.json({ success: false, msg: 'Помилка авторизації. Такого користувача не знайдено!' });
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          let token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({success: true, data: token});
        } else {
          res.json({success: false, msg: 'Помилка авторизації! Невірний пароль!'});
        }
      });
    }
  });
};

exports.changePass = function (req, res) {
	User.changePass(req, () => {
		return res.json({
			success: false,
			msg: 'Такого користувача не знайдено!'
		});
	}, () => {
		return res.json({
			success: false,
			msg: err
		});
	}, (user) => {
		let token = jwt.encode(user, config.secret);
		return res.json({
			success: true,
			msg: 'Пароль користувача успішно змінено!',
			token: token
		})
	}, () => {
		return res.json({
			success: false,
			msg: 'Введено невірний поточний пароль користувача!'
		});
	})
}

