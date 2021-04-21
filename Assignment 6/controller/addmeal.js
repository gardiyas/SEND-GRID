const express = require("express");
const router = express.Router();
const database = require("../server.js");
const loginController= require("./login.js");
let isalter =loginController.alter;
let name=loginController.name;
function ensureAuthorization(req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
  
    if (!(req.session.user.isClerk)) {
      console.log(req.session.user.Email);
      console.log("You are not authorised");
      res.redirect("/authorization");
      //res.render("403");
    } else {
      next();
    }
  }
}

router.get("/alter",ensureAuthorization,(req,res)=>{
    res.render("alter",{alter:isalter , loggeduser:name
    });
    
})

router.get("/addmeal",ensureAuthorization, (req, res) => {

    res.render("addMeal", {
      head: "Add page",
      alter:isalter,
      loggeduser:name

    });
  })
  router.post("/mealdatabase", (req, res) => {
    var meal = new database.mealsTable({
      packagename: req.body.name,
      meals: req.body.meals,
      synopsis: req.body.synopsis,
      category: req.body.category,
      price: req.body.price,
      description: req.body.desc,
      image: req.body.image,
      istop: Boolean(req.body.istop)
    })
  
    meal.save((err) => {
      if (err) {
        console.log(`There was an error in saving ${err}`);
      } else {
        console.log("The meal was saved to the BigFOOD");
      }
    });
    res.render("addMeal", {
      head: "Add page",
      confirmation:`The "${req.body.name}"  meal has been added successfully.`,
      alter:isalter, loggeduser:name


    });
  })
  


module.exports = router;