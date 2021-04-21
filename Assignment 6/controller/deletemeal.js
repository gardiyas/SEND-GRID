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
   // if (!((req.session.user.Email).localeCompare("ss9112000@gmail.com") == 0)) {
    if (!(req.session.user.isClerk)) {
      console.log(req.session.user.Email);
      console.log("You are not authorized");
      res.redirect("/authorization");
      //res.render("403");
    } else {
      next();
    }
  }
}
router.get("/deletemeal", ensureAuthorization, (req, res) => {
    res.render("deletemeal", {
      head: "delete meal page",
      alter:isalter,
      loggeduser:name

    });
  })
  
  router.post("/deletemeal", (req, res) => {
    database.mealsTable.findOne({
        packagename: req.body.name,
      })
      .exec()
      .then((meal) => {
        if (!meal) {
  
          res.render("deletemeal", {
            head: "Update page",
            err: "The Meal is not found.",
            alter:isalter,
            loggeduser:name

          });
        } else {
          database.mealsTable.deleteOne({
              packagename: req.body.name
            })
            .exec()
            .then(() => {
              // removed company
              console.log("meal removed");
            })
            .catch((err) => {
              console.log(err);
            });
          res.render("deletemeal", {
            head: "delete meal page",
            confirmation: `The "${meal.packagename}" meal has been deleted successfully.`,
            alter:isalter,
            loggeduser:name

          });
        }
      });
  })
  
  


module.exports = router;
