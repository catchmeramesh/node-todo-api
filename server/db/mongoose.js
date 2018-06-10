var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://ds153980.mlab.com:53980/todoapp');

if (process.env.PORT === 3000) {
    mongoose.connect(process.env.MONGODB_URI)
}else{
    mongoose.connect(process.env.MONGODB_URI,{
        useMongoClient: true
    });
}



// mongoose.connect('mongodb://Ramesh:Rsrjvs7U@ds153980.mlab.com:53980/todoapp', {
//         useMongoClient: true,
//     });

module.exports = {mongoose}