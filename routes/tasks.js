var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://simonlevente:simonlevente@ds035177.mlab.com:35177/node', ['tasks']);

//get all tasks
router.get('/task', function(req, res, next) {
	
	
	db.tasks.find(function(err, docs){
		if(err){
			res.send(err);
		}
		res.json(docs);
	});
});


//get single task
router.get('/task/:id', function(req, res, next) {
	
	
	db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
		if(err){
			res.send(err);
		}
		res.json(task);
	});
});

//save task
router.post('/task', function(req, res, next) {
	
	var task = req.body;
	if(!task.title || (task.isDone + '')){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});

	} else {
		db.tasks.save(task, function(err, task){
			if(err){
				res.send(err);
			}
			res.json(task);
		});
	}
	
});

//delete single task
router.delete('/task/:id', function(req, res, next) {
	
	
	db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
		if(err){
			res.send(err);
		}
		res.json(task);
	});
});

//update single task
router.put('/task/:id', function(req, res, next) {
	
	var task = req.body;
	var updTask = {};

	if(task.isDone){
		updTask.isDone = task.isDone;
	}

	if(task.title){
		updTask.title = task.title;
	}

	if(!updTask){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {}, function(err, task){
		if(err){
			res.send(err);
		}
		res.json(task);
	});
	}
});

module.exports = router;