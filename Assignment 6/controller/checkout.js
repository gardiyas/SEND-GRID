const express = require("express");
const router = express.Router();
const database = require("../server.js")
const loginController= require("./login.js");
let isalter =loginController.alter;
let name=loginController.name;
function ensureLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }

}

router.get("/mealdetail/:caption", (req, res) => {

    database.mealsTable.findOne({
        packagename: req.params.caption,
      })
      .exec()
      .then((meal) => {
        if (meal) {
          let ele = meal;
          res.render("mealdetails", {
            head: `${ele.packagename} Meal`,
            name: ele.packagename,
            price: ele.price,
            synopsis: ele.synopsis,
            meals: ele.meals,
            desc: ele.description,
            image: ele.image,
            istop: ele.istop,
            category: ele.category,
            alter:isalter,
            loggeduser:name

          });
  
        }
      })
  })
  
  let y = [];
  router.post("/checkout", ensureLogin, (req, res) => {
    let quantity = req.body.quantity;
    database.mealsTable.findOne({
        packagename: req.body.name,
      })
      .exec()
      .then((meal) => {
        if (meal) {
          let ele = meal;
          y.push({
            name: ele.packagename,
            meals: ele.meals,
            synopsis: ele.synopsis,
            price: ele.price,
            quantity: quantity,
            category: ele.category,
            total: quantity * ele.price,
          });
          const grand = () => {
            let grand = 0;
            y.forEach((ele) => {
              grand += parseInt(ele.quantity) * parseInt(ele.price);
            })
            return grand;
          }
          const quatotal = () => {
            let grand = 0;
            y.forEach((ele) => {
              grand += parseInt(ele.quantity);
            })
            return grand;
          }
          const nametotal = () => {
            let grand = "";
            y.forEach((ele) => {
              grand += ele.name + " * " + ele.quantity + " = $" + ele.total + "<br>";
            })
            return grand;
          }
          res.render("checkout", {
            head: `${ele.packagename} Meal`,
            yo: y,
            grand: grand(),
            nametotal: nametotal(),
            totalquantity: quatotal(),
            alter:isalter,
            loggeduser:name

          });
  
        }
      })
  })
  
  
  router.post("/shipping", ensureLogin, (req, res) => {
    var usercheckout = new database.checkoutInfo({
      FirstName: req.body.fname,
      LastName: req.body.lname,
      Email: req.body.email,
      Address: req.body.address,
      Zip: req.body.zip,
      city: req.body.city,
      prvince: req.body.province,
      country: req.body.country,
      cardname: req.body.cname,
      cardnumber: req.body.cnumber,
      cardexpiry: req.body.cexpiry,
      cardcvv: req.body.cvv,
    })
    usercheckout.save((err) => {
      if (err) {
        console.log("There was an error in saving");
      } else {
        console.log("The usercheckout was saved to the HungerThief");
      }
    });
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.MY_API_ID);
    const msg = {
      to: `${req.body.email}`,
      from: 'eisik1@myseneca.ca',
      subject: 'Shipping Confirmation',
      html: `<b>Hello ${req.body.fname}, <br>
        This Email is a confirmation that your purchase of the following items is successfull." <br>
        Below are the details of your order. <br>
        Customer Name: ${req.body.fname} ${req.body.lname} <br>
        Items: ${req.body.packages} <br>
        Total: $${req.body.total} <br>
        Thank You, <br>
        BigFOOD. <b>`,
    };
    sgMail.send(msg)
      .then(() => {
        y = [];
        res.redirect("/shippingdashboard");
      })
      .catch(err => {
        console.log(`error is ${err}`);
      })
  })
  
  router.get("/shippingdashboard", (req, res) => {
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
                        <h1> Thank you!</h1>
                    </div>
                    <div id="dash_data">
                       Thank you for ordering with BigFOOD. You will get a confirmation email shortly.
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
  })
  


module.exports = router;