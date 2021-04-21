const express = require("express");
const router = express.Router();
const userTable = require("../server.js")
const loginController= require("./login.js");
let isalter =loginController.alter;
let name=loginController.name;
////////////////////////
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(12);

//////////////////////
router.get("/signup", (req, res) => {


    res.render("signup", {
        head: "Sign up page",
        alter:isalter,
        loggeduser:name

    });
})

router.post("/submit-signup", (req, res) => {
    var err_email = [];
    var err_pass = [];
    var err_confirm_pass = [];
    var err_fname = [];
    var err_lname = [];
    let numbers = /[0-9]/g;
    let Schar = /[@#$&%^*!]/g
    let lower = /[a-z]/g;
    let upper = /[A-Z]/g;
    let storefname;
    let storelname;
    let storeemail;
    let storepass;
    let storeconpass


    if (req.body.fname === "") {
        err_fname.push("Please enter the First Name.")
    }
    if (req.body.lname === "") {
        err_lname.push("Please enter the Last Name.")
    }   

    if (req.body.password === "") {
        err_pass.push("Please enter the Password.")

    } else
    if (req.body.passwordrepeat == "") {
        err_confirm_pass.push("Re-enter you password.")
    } else
    if (!(req.body.passwordrepeat == req.body.password)) {
        err_confirm_pass.push("Password does not match.")
    } else
    if (req.body.passwordrepeat.length < 8) {
        err_confirm_pass.push("Password mush be of atleast 8 characters.")
    } else
    if (!(req.body.passwordrepeat.match(numbers))) {
        err_confirm_pass.push("Password must have a number.")
    } else    
    if (!(req.body.passwordrepeat.match(lower))) {
        err_confirm_pass.push("Password must have a lower case alphabet.")

    } else
    if (!(req.body.passwordrepeat.match(upper))) {
        err_confirm_pass.push("Password must have a upper case alphabet.")

    }
    if (req.body.email === "") {
        err_email.push("Please enter the email.")


        if (err_email.length > 0 || err_pass.length > 0 || err_confirm_pass.length > 0 || err_fname.length > 0 || err_lname.length > 0) {
            storefname = req.body.fname;
            storelname = req.body.lname;
            storeemail = req.body.email;
            storepass = req.body.password;
            storeconpass = req.body.passwordrepeat;
            res.render("signup", {

                head: "Sign up page",
                email: err_email,
                pass: err_pass,
                conpass: err_confirm_pass,
                fname: err_fname,
                lname: err_lname,
                storedfname: storefname,
                storedlname: storelname,
                storedemail: storeemail,
                storedpass: storepass,
                storedconpass: storeconpass
            })
        }
    } else
        userTable.usersTable.findOne({
            Email: req.body.email
        })
        .exec()
        .then((company) => {
            if (company) {
                err_email.push("The email already exists");
            }

            if (err_email.length > 0 || err_pass.length > 0 || err_confirm_pass.length > 0 || err_fname.length > 0 || err_lname.length > 0) {
                storefname = req.body.fname;
                storelname = req.body.lname;
                storeemail = req.body.email;
                storepass = req.body.password;
                storeconpass = req.body.passwordrepeat;
                res.render("signup", {
                    head: "Sign up page",
                    email: err_email,
                    pass: err_pass,
                    conpass: err_confirm_pass,
                    fname: err_fname,
                    lname: err_lname,
                    storedfname: storefname,
                    storedlname: storelname,
                    storedemail: storeemail,
                    storedpass: storepass,
                    storedconpass: storeconpass,
                    alter:isalter,
                    loggeduser:name

                })
            } else {
                var hash = bcrypt.hashSync(req.body.password, salt);
                var user = new userTable.usersTable({
                    FirstName: req.body.fname,
                    LastName: req.body.lname,
                    Email: req.body.email,
                    Password: hash

                    //Password: req.body.password
                })
                user.save((err) => {
                    if (err) {
                        console.log("There was an error in saving");
                    } else {
                        console.log("The user was saved to the HungerThief");
                    }
                });
                storefname = "";
                storelname = "";
                storeemail = "";
                storepass = "";
                storeconpass = "";

                const sgMail = require('@sendgrid/mail');
                sgMail.setApiKey(process.env.MY_API_ID);
                const msg = {
                    to: `${req.body.email}`,
                    from: 'eisik1@myseneca.ca',
                    subject: 'Registration Confirmation',
                    html: `Hello ${req.body.fname}, <br>
                 This Email is a confirmation that you are successfully registered as a new user in "Hunger Thief" <br>
                 Tasty food on the way. <br>
                 Thank You, <br>
                 Hunger Thief.`,
                };
                sgMail.send(msg)
                    .then(() => {
                        res.redirect("/dashboard");
                    })
                    .catch(err => {
                        console.log(`error is ${err}`);
                    })
            }

        })


})

router.get("/dashboard", (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../css/style.css">
    <script src="https://kit.fontawesome.com/347a9e55b8.js" crossorigin="anonymous"></script>
</head>
<style>
    body {
        background-color: rgb(252, 252, 252);
    }
    i {
        margin-top:10px;
        color: green;
        font-size: 25px;
        text-align: left;
    }
</style>
<body>
    <header>
    </header>
    <main>
        <div class="dash_main">
            <i class="fas fa-utensils"></i>
            <div id="dash_top">
            </div>
            <div id="eat_repeat">Welcome to best Taste in BigFOOD</div>
            <div id="dash_message">
                <div id="thank">
                    <h1> Thank you!</h1>
                </div>
                <div id="dash_data">
                    You are sucessfully registered as a new user in BigFOOD.
                </div>
            </div>
        </div>
        <div id="dash_footer">
            Click <a href="/">here</a> to navigate yourself to the <span id="homepage"> [Main <span
                    class="thief">PAGE]</span></span>
        </div>
    </main>
</body>
</html>`)
})
module.exports = router;