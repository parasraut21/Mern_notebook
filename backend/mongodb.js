const {MongoClient} = require('mongodb')
const url = "mongodb://0.0.0.0:27017";
const database ='paras';
const client = new MongoClient(url);

async function  dbconnect(){
  let result = await client.connect();
  let db = result.db(database);
 return  collection = db.collection("p");
  // let collection = db.collection("p");
  // let responce = await collection.find({}).toArray(); making another fil for this to keep collection separate .
  //      console.log(responce);
}

module.exports =dbconnect;