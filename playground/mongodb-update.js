const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log('Unable to connect to DB.');
    }
    console.log('Connected to the database.');

    var db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: ObjectID('5b1b1b064c40d6241869b93a')
    // },
    // {
    //     $set:{completed:true}
    // },
    // {
    //     returnOriginal:false
    // }
    // ).then((result)=>{
    //     console.log(result);
    // });
        
    db.collection('Users').findOneAndUpdate({
        _id: ObjectID('5b1b1ee8fd8ced2481343e8d')
    },
    {
        $set: {
            name: 'Dheeran'
        },
        $inc:{
            age: -29
        }
    }
).then((result)=>{
    console.log(result);
});

    client.close();
});