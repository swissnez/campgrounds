//jshint esversion:9


const { MongoClient } = require("mongodb");


const uri = 'mongodb://127.0.0.1:27017/sample';

const client = new MongoClient(uri);

const run = async () => {
    try {   

        await client.connect();

        const db = client.db("sample");
        const movies = db.collection('movies');
        console.log(movie);

    } finally {
        await client.close();
    }
    
};

run().catch(console.dir)
