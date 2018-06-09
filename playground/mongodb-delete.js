const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log('Unable to connect to DB.');
    }
    console.log('Connected to the database.');

    var db = client.db('TodoApp');

    // db.collection('Users').deleteMany({name:'Mithran'}).then((result)=>{
    //     console.log(result);
    // });

    db.collection('Users').findOneAndDelete({_id:ObjectID('5b1b1f347ffab824852a7543')}).then((docs)=>{
        console.log(docs);
    });

    client.close();
});