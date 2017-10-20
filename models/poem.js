let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let moment = require('moment');

let PoemSchema = new Schema({
  title: {
        type: String,
        required: true
    },
  body: {
        type: String,
        required: true
    },
  date: {
        type: Date,
        required: true
        }
});

let Poem = mongoose.model('Poem', PoemSchema);
let Recycled = mongoose.model('Recycled', PoemSchema);

exports.savePoem = function(poem, cb1, cb2) {
	  let newPoem = new Poem({
			title: poem.title,
			body: poem.body,
			date: moment(poem.date)
  	});
	  let promise = newPoem.save();
  	promise
			.then(cb1())
			.catch(err => {cb2(err)})
}

exports.poemsList = function(cb) {
	Poem.find(function(err, poems){
		cb(err, poems);
	})
};

exports.recycledPoemsList = function(cb) {
	Recycled.find(function(err, poems){
		cb(err, poems);
	})
}


exports.editPoem = function (poem, cb1, cb2, cb3) {
	Poem.findById({
		_id: poem.id
	}, (err, findedPoem) => {
		if (err) {
			cb(err)
		} else {
			console.log(findedPoem);
			findedPoem.set({
				title: poem.title,
				body: poem.body,
				date: poem.date
			});
			let promise = findedPoem.save();
			promise
				.then(cb2())
				.catch(err => {
					cb3(err)
				})
		}
	})
};

exports.recycle = function (poem, cb1, cb2) {
	let newRecyclePoem = new Recycled({
		title: poem.title,
		body: poem.body,
		date: poem.date
	});
	let promise = newRecyclePoem.save();
	promise
		.then(() => {
			Poem.findOneAndRemove({
				_id: poem.id
			}, (err, doc) => {
				cb1(err);
			})
		})
		.catch((err) => (cb2(err)))
};

exports.delete = function (poem, cb) {
	Recycled.findOneAndRemove({
		_id: poem.id
	}, (err, doc) => {
		cb(err);
	})
};

exports.restore = function (poem, cb1, cb2) {
	let restoredPoem = new Poem({
		title: poem.title,
		body: poem.body,
		date: poem.date
	});

	let promise = restoredPoem.save();
	promise
		.then(() => {
			Recycled.findOneAndRemove({_id: poem.id}, (err, doc) => {
				cb1(err);
			});
		})
		.catch(err => {cb2(err)})
}
