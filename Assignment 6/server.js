
/************************************************************************************
* WEB322 – Assignment 4 (Winter 2021)
* I declare that this assignment is my own work in accordance with Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* Name: Emre Isik
* Student ID: 137524195
* Course: WEB322NCC
* Github: https://github.com/gardiyas/Web322-Assignment4
*
************************************************************************************/
const express = require("express");
const app = express();
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
require('dotenv').config({path:"./config/keys.env"});
const clientSessions = require("client-sessions");

// mangoDB
var mongoose = require("mongoose");
let a=("mongodb+srv://emredbweb:Password!@web322clusteremre.cvsbc.mongodb.net/Web322db?retryWrites=true&w=majority");
mongoose.connect( a,{ useNewUrlParser: true, useUnifiedTopology: true });
var Schema = mongoose.Schema;
var BigFOODuser = new Schema({
    "FirstName":  String, 
    "LastName": String,
    "Email": String,
    "Password": String ,
    "isClerk":Boolean
  });
  var BigFOODmeal = new Schema({
    "packagename":  String, 
    "meals": String,
    "synopsis": String,
    "category": String ,
    "price": String ,
    "description": String,
    "image":String,
    "istop":Boolean

  });

  var checkoutData = new Schema({
    "FirstName":  String, 
    "LastName": String,
    "Email": String,
    "Address": String ,
    "Zip": String, 
    "city": String ,
    "prvince": String ,
    "country": String ,
    "cardname": String ,
    "cardnumber": String ,
    "cardexpiry": String ,
    "cardcvv": String ,
  });

  var usersTable = mongoose.model("Hungerthief", BigFOODuser);
  var mealsTable = mongoose.model("Hungerthiefmeal", BigFOODmeal);
  var checkoutInfo = mongoose.model("UserCheckoutData", checkoutData);

const tables={
    usersTable,mealsTable,checkoutInfo
}
  module.exports = tables;
// mangoDB

app.use(clientSessions({
  cookieName: "session", 
  secret: "week10example_web322", 
  duration: 10 * 60 * 1000, 
  activeDuration: 2000 * 60 
}));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
const generalController = require("./controller/general.js");
const loginController= require("./controller/login.js");
const signupController= require("./controller/signup.js");
const altermealController = require("./controller/authorization.js");
const addmealController = require("./controller/addmeal.js");
const updatemealController = require("./controller/updatemeal.js");
const deletemealController = require("./controller/deletemeal.js");
const checkoutController = require("./controller/checkout.js");



app.use("/",generalController,loginController.router,signupController,altermealController,addmealController,updatemealController,deletemealController,checkoutController);

app.listen(process.env.PORT || 8080, () => {
    console.log("APP IS RUNNING");
})