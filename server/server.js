var express = require('express');
var bodyParser = require('body-parser');

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

app.listen('3000',()=>{
    console.log('Server started and listening @ port 3000');
});

module.exports = {app}