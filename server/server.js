require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

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

// app.post('/users',(req,res)=>{
//     var user = new User({
//         email: req.body.email
//     });

//     user.save().then((doc)=>{
//         res.send(doc);
//     },(err)=>{
//         res.send(err);
//     });

// })

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

// Updating a todo

app.patch('/todos/:id',(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(id)){
        res.status(404).send();
    };

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    };

    Todo.findByIdAndUpdate(id, {$set:body},{new:true}).then((todo)=>{
        if(!todo){
            return res.statsu(404).send();
        }
        
        res.send({todo});

    }).catch((e)=>{
        res.status(404).send();
    });

})

app.post('/users',(req,res)=>{
    var user = _.pick(req.body,['email','password']);
    var userObj = new User(user);
    
    userObj.save().then(()=>{
        return userObj.generateAuthToken();
        //res.send(doc);
    }).then((token)=>{
        res.header('x-auth',token).send(userObj); 
    }).catch((err)=>{
        res.status(400).send(err);
    });
});

app.listen(process.env.PORT,()=>{
    console.log(`Server started and listening @ port ${process.env.PORT}`);
});

module.exports = {app}