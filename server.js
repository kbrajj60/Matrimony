const express = require('express');
 const db = require('./config/db');

const app = express();

app.get('/',(req,res) => res.send("You got connected to Matirmony app sucessfully"));

//Connecting Mongo DB
db();

//Initilize Middleware.
app.use(express.json({extended: false}));

//Define different routes.
app.use('/api/users', require('./routes/api/users'));
// app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/login', require('./routes/api/login'));
// app.use('/api/matches', require('./routes/api/matches'));

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log("iam listening on 5000"));

