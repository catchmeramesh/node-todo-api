var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://ds153980.mlab.com:53980/todoapp');



var port = process.env.PORT || 3000;

if (port === 3000){
    mongoose.connect('mongodb://localhost:27017/TodoApp');
}else{
    mongoose.connect('mongodb://Ramesh:Rsrjvs7U@ds153980.mlab.com:53980/todoapp', {
        useMongoClient: true,
    });
}


module.exports = {mongoose,port}