var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactapp', ['contactapp']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactList', function(req, res){
	console.log('I received a GET request');
	db.contactapp.find(function(err, data){
		console.log(data);
		res.json(data);
	});
});

app.post('/contactList', function(req, res){
	console.log(req.body);
	db.contactapp.insert(req.body, function(err, data){
		res.json(data);
	});
});

app.delete('/contactList/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactapp.remove({_id: mongojs.ObjectId(id)}, function(err, data){
		res.json(data);
	});
});

app.get('/contactList/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactapp.findOne({_id: mongojs.ObjectId(id)}, function(err, data){
		res.json(data);
	});
});

app.put('/contactList/:id', function(req, res){
	var id = req.params.id;
	console.log(req.body.name);
	db.contactapp.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, phone: req.body.phone}},
    new: true}, function (err, data) {
      res.json(data);
    }
  );
});

app.listen(3000);
console.log('Server running on port 3000');
