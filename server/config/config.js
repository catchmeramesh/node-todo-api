
var env = process.env.NODE_ENV || 'development';

if (env === 'development'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
} else {
    mongoose.connect('mongodb://Ramesh:Rsrjvs7U@ds153980.mlab.com:53980/todoapp', {
        useMongoClient: true,
    });
}

