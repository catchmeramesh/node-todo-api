const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {User} = require('./../server/models/user');

var id = '5b1c1d90d0b4e3b92e314158a';

if(!ObjectID.isValid(id)){
    console.log('Object id not valid');
}


User.findById(id).then((user)=>{
    if(!user){
        return console.log('User not found.');
    }
    console.log('User',JSON.stringify(user,undefined,2));
},(e)=>{
    console.log('Error',e);
});

