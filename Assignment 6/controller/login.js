const express = require("express");
const router = express.Router();
const userTable = require("../server.js")
var bcrypt = require('bcryptjs');
let alter=[];
let name=[];
//let alter;
router.get("/login", (req, res) => {
    res.render("login", {
        head: "Login page",
        alter:alter,
        loggeduser:name
    });
})

router.post("/submit-login", (req, res) => {
    var err_email = [];
    var err_pass = [];
    var err_db = [];
    let storeEmail;
    let storepass;

    if (req.body.password === "") {
        err_pass.push("Please enter the Password.")
    }

    if (req.body.email === "") {
        err_email.push("Please enter the email.")

        if (err_email.length > 0 || err_pass.length > 0) {
            storeEmail = req.body.email;
            storepass = req.body.password;
            res.render("login", {
                head: "Login page",
                email: err_email,
                pass: err_pass,
                storedEmail: storeEmail,
                storedPass: storepass,
            })

        }
    } else {
        // true

        userTable.usersTable.findOne({
                Email: req.body.email,
                //Password: req.body.password
            })
            .exec()
            .then((company) => {
                if (!company) {
                    //err_email.push("Either the Email or the Password does not match with our records");
                    err_email.push("The Email  does not match with our records.");

                } else {
                    if (!(bcrypt.compareSync(req.body.password, company.Password))) {
                        err_pass.push("The Password is incorrect.");
                    }
                }

                if (err_email.length > 0 || err_pass.length > 0) {
                    storeEmail = req.body.email;
                    storepass = req.body.password;
                    res.render("login", {
                        head: "Login page",
                        pass: err_pass,
                        email: err_email,
                        storedEmail: storeEmail,
                        storedPass: storepass,
                    })

                } else {
                    req.session.user = {
                        Email: req.body.email,
                        Password: req.body.password,
                        FirstName:company.FirstName,
                        isClerk:company.isClerk
                    };
                  if (req.session.user){
                    name.push(req.session.user.FirstName);
                  }
                    console.log(`${req.session.user.FirstName} is logged in`);                    
                        if (req.session.user.isClerk){
                        console.log("Data entry clerk is logged in");
                        alter.push("Alter");
                        //alter="Alter";
                        res.render("login", {
                            confirmation: `Hello ${company.FirstName} (Data entry clerk), you are successfully logged in. You have access to change the meal information`,
                            alter:alter ,
                            loggeduser:name
                        });
                    }else{
                     
                        //if the user is not clerk, then do not show Alter link on the navbar
                        alter.splice(0, alter.length);
                        //alter=undefined;
                    res.render("login", {
                        confirmation: `Hello ${company.FirstName}, you are successfully logged in.`,  loggeduser:name
                    });
                }
                }
            })
    }
})

router.get("/logout", function (req, res) {
   req.session.reset();
  // alter=undefined;
    
    alter.splice(0, alter.length);
    name.splice(0, name.length);

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
                <div id="eat_repeat">BigFOOD is always in your Service</div>
                <div id="dash_message">
                    <div id="thank">
                        <h1>  You are sucessfully logged out from BigFOOD</h1>
                    </div>
                    <div id="dash_data">
                    Thank you for using BigFOOD!
                    </div>
                </div>
            </div>
    
            <div id="dash_footer">
                Click <a href="/">here</a> to navigate yourself to the <span id="homepage"> [Main <span
                        class="thief">Page]</span></span>
            </div>
        </main>
    </body>
    </html>`)
});

module.exports = {router,alter,name};