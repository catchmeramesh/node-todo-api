const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log('Unable to connect to DB.');
    }
    console.log('Connected to the database.');

    var db = client.db('TodoApp');

    // db.collection('Users').insertOne({
    //     name: 'Mithran',
    //     age: 6,
    //     location: 'Ballwin'
    // },(err,result)=>{
    //     if(err){
    //         return console.log('Insert Failed.');
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });

    // db.collection('Users').find({name:'Mithran'}).toArray().then((docs)=>{
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log('Error fetching data.',err);
    // })

    db.collection('Todos').find().count().then((count)=>{
        console.log('Total todos:',count);
    })

    client.close();
});