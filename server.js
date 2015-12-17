var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.get('/contactlist', function(req, res){
  console.log('get request in /contactlist');
  db.contactlist.find(function(err, contacts){
    if(err){
      console.log('error finding contacts');
      res.json([]);
    }
    res.json(contacts);
  });

});
app.post('/contactlist', function(req, res){
  console.log('post request in /contactlist');
  db.contactlist.insert(req.body, function(err, doc){
    if(err){
      res.json(null);
    }
    res.json(doc);
  });
});

app.get('/contactlist/:id', function(req, res){
  console.log('get request in /contactlist/:id');
  var id = req.params.id;
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
    if(err){
      res.json(null);
    }
    res.json(doc);
  });
});

app.put('/contactlist/:id', function(req, res){
  console.log('put request in /contactlist/:id');
  var id = req.params.id;
  db.contactlist.findAndModify({
    query: { _id: mongojs.ObjectId(id) },
    update: {$set: { name: req.body.name, email: req.body.email, number: req.body.number }},
    new: true
  }, function(err, doc){
    if(err){
      res.json(null);
    }
    res.json(doc);
  });
});


app.delete('/contactlist/:id', function(req, res){
  console.log('delete request in /contactlist/:id');
  var id = req.params.id;
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
    if(err){
      res.json(null);
    }
    res.json(doc);
  });
});
app.listen(3000);
console.log('server running on port 3000');
