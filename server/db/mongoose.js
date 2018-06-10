var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://ds153980.mlab.com:53980/todoapp');

mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose}