var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');


var app = express();

app.use(bodyParser.json());


app.post('/todos',(req,res)=>{
    var todo =  new Todo({
        text: req.body.text
    });

    todo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    })
});

app.post('/users',(req,res)=>{
    var user = new User({
        email: req.body.email
    });

    user.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.send(err);
    });

})

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    }, (e)=>{
        res.status(400).send(e);
    })
});

app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        res.status(404).send({msg:'Object id invalid'});
    };

    Todo.findById(id).then((todo)=>{
        if(!todo){
            res.status(404).send({msg:'Todo Not found'});
        }
        res.send({todo});
    },(e)=>{
        res.status(400).send({msg:'Uh oh, something went wrong.'});
    });

});

app.listen('3000',()=>{
    console.log('Server started and listening @ port 3000');
});

module.exports = {app}