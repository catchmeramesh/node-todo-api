var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose,port} = require('./db/mongoose');
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
    }).catch((e)=>{
        res.status(404).send();
    });

});

// Deleting a todo

app.delete('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(404).send();
    };

    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }

        res.send({todo});

    }).catch((e)=>{
        res.status(400).send();
    });
});

app.listen(port,()=>{
    console.log(`Server started and listening @ port ${port}`);
});

module.exports = {app}