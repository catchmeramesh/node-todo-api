var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://Ramesh:Rsrjvs7U@ds153980.mlab.com:53980/todoapp' || 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose}