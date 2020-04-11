var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')


var app = express()
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://bharathi-admin:bharathipassword@sandbox-ile6l.mongodb.net/test";

app.use(serveStatic(path.join(__dirname, 'dist')))


app.get("/girls",function(req, res){
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
    });
});


var port = process.env.PORT || 8000
app.listen(port)
console.log('server started ' + port);