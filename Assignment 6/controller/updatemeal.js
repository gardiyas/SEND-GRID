const express = require("express");
const router = express.Router();
const database = require("../server.js")
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
router.get("/updatemeal", ensureAuthorization, (req, res) => {

    res.render("updatemeal", {
      head: "Update page",
      alter:isalter,
      loggeduser:name

    });
  })
  
  router.post("/updatemeal", ensureAuthorization, (req, res) => {
    let error;
    database.mealsTable.findOne({
        packagename: req.body.name,
      })
      .exec()
      .then((meal) => {
        if (!meal) {
  
          res.render("updatemeal", {
            head: "Update page",
            err: "The Meal is not found.",
            alter:isalter,
            loggeduser:name

          });
  
        } else {
          let ele = meal;
          res.render("updatingmeal", {
            head: "AddMeal page",
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
  
  router.post("/mealupdated", ensureAuthorization, (req, res) => {
  
    database.mealsTable.updateOne({
      packagename: req.body.name
    }, {
      $set: {
        price: req.body.price,
        meals: req.body.meals,
        description: req.body.desc,
        synopsis: req.body.synopsis,
        image: req.body.image,
        istop: Boolean(req.body.istop)
  
      }
    }).exec();
    res.render("updatemeal",{ head: "Update page", confirmation:`The "${req.body.name}" meal has been updated successfully.`,alter:isalter
});
  })
  
  

module.exports = router;
