const express = require("express");

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://bharathi-admin:bharathipassword@sandbox-ile6l.mongodb.net/test";

const app = express();

app.get("/girls",function(req, res){
//    res.send("Smethig will be better");
   MongoClient.connect(uri, function(err, client) {
    if(err) {
         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
    }
    console.log('Connected...');
    const collection = client.db("matri").collection("girlsDetails");
   
    var dbo = client.db("matri");
    dbo.collection("girlsDetails").findOne({}, function(err, result) {
        
    res.send(JSON.stringify(result.name));
    if (err) throw err;
    });
    // perform actions on the collection object
    client.close();
 });
 
 })

app.listen(3000);

var msg = 'Hello World';
console.log(msg);