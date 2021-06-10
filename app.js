const express = require('express');
const app = express();
const passport = require('passport');

app.set("view engine","ejs");

const routes = require('./routes'); // getting routes 
var mongoose = require('mongoose');


//let mongoDB = process.env.MONGODB_URL;

let mongoDB = 'mongodb://localhost:27017/login-app-db';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.log.bind('Error in connecting to the Database'));

db.once('open', function () {
    console.log('Connected to the Database!');
});


 const PORT = process.env.PORT || 5000; //setting up our port
// // app.get('/', (req, res)=>{
// //     res.send("welcome to our wbesite");
// // });
app.use(express.json()); //it used to convert the body of a requset in json format
app.use(express.urlencoded({ extended: true }));
// app.use('*', (req, reAQQ11Q2A1212QQ21QA1Q1   s)=>{
//     res.send("hello");
// }); 
app.use('/', routes);
  // it is used to handle  all routes

app.listen(PORT, (err) => {
    if (err) {
        console.log(`there is an error ${err}`);
    }
    console.log(`the server is running on ${PORT}`);
});

