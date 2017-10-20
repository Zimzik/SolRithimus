let Poem = require('../models').Poem;

exports.savePoem = function (req, res) {
	Poem.savePoem(req.body, () => {
		console.log("Data saved on db");
		res.json({
			success: true,
			msg: "Вірш збережено в базі даних!"
		})
	}, (err) => {
		console.log(err);
		res.json({
			success: false,
			msg: err
		});
	})
}

exports.poemsList = function (req, res) {
	Poem.poemsList((err, poems) => {
		if (err) {
			console.log(err);
			return res.json({
				success: false,
				msg: err
			})
		}
		res.json({
			success: true,
			data: poems
		});
	})
}

exports.recycledPoemsList = function(req, res) {
	Poem.recycledPoemsList((err, poems) => {
		if (err) {
			console.log(err);
			return res.json({
				success: false,
				msg: err
			})
		}
		res.json({
			success: true,
			data: poems
		});
	})
};


exports.editPoem = function (req, res) {
	Poem.editPoem(req.body, () => {
		console.log(err);
		res.status(500).json({
			err: "There are some problem with editing of this record"
		});
	}, () => {
		res.json({
			success: true,
			msg: `Poem saved on DB.`
		});
	}, (err) => {
		console.log(err);
		res.status(403).send("There are some problem with editing of this record");
	})
}

exports.recycle = function(req, res) {
	Poem.recycle(req.body, (err) => {
		if (err) {
			console.log(err);
			res.json({
				success: false,
				msg: "There are some problem with deleting this item!"
			})
		} else {
			res.json({
				success: true,
				msg: `Poem  moved to the recycle.`
			});
		}
	}, (err) => {
		console.log(err);
		res.json({success: false, msg: "There are some problem with deleting this item!"});
	})
};


exports.delete = function(req, res) {
	Poem.delete(req.body, (err) => {
		if (err) {
			console.log(err);
			res.json({
				success: false,
				msg: err
			});
		} else {
			res.json({
				success: true,
				msg: `Poem  deleted from DB.`
			});
		};
	})
};

exports.restore = function(req, res) {
	Poem.restore(req.body, (err) => {
		if (err) {
			console.log(err);
			res.json({success: false, msg: err});
		} else {
			res.json({success: true, msg: `Poem  moved to the main list.`});
		}
	}, (err) => {
		console.log(err);
		res.json({success: false, msg: err});
	})
}

