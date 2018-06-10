var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://ds153980.mlab.com:53980/todoapp');


mongoose.connect('mongodb://ds153980.mlab.com:53980/todoapp', {
  useMongoClient: true,
});

module.exports = {mongoose}