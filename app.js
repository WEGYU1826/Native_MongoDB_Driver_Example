const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'); // all to do with testing 

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'FruitsDB';

// create a new mongoDB client
const client = new MongoClient(url, {useNewUrlParser: true});

// Use connect method to connect to the server
client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    // insertDocuments(db, function () {
    //     client.close();
    // });

    findByIDDocuments(db , () => {
        client.close();
    })
});

const insertDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Insert some documents
    collection.insertMany([{
            name: "apple",
            score: 5,
            review: "very very nice"
        },
        {
            name: "orange",
            score: 7,
            review: "very very sour"
        },
        {
            name: "Banana",
            score: 5,
            review: "best fruit"
        }
    ], function (err, result) {
        assert.equal(err, null);
        // assert.equal(3, result.result.n);
        // assert.equal(3, result.ops.length);
        assert.equal(3, result.insertedCount);
        assert.equal(3, Object.keys(result.insertedIds).length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}

const findDocuments = function (db, callback){

    const collection = db.collection('fruits'); 
    collection.find({}).toArray((err , fruits) => {
        assert.equal(err , null);
        console.log("Found the following records");
        console.log(fruits);
         callback(fruits);
    })
}

const findByIDDocuments = function (db, callback){
    
    const collection = db.collection('fruits');
    // let id = "62fcb9ad02813332bbd07eee"; 
    // let _id = new ObjectId(id);
    collection.find({'name': 'Mango'}).toArray((err , fruits) => {
        assert.equal(err , null);
        console.log("Found the following records");
        console.log(fruits);
         callback(fruits);
    })
}