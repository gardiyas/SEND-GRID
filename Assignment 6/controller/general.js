const express = require("express");
const router = express.Router();
const ServicesDB = require("../model/script1.js")
const database = require("../server.js")
const loginController= require("./login.js");
let isalter =loginController.alter; 
let name=loginController.name;

// const ensuresName=(req,res,next)=>{
//     if (req.session.user) {
//     console.log(req.session.user);
//     return req.session.user.FirstName;
//     }
//     else
//     return "";
// }
router.get("/", (req, res) => {
    const fakeDB = new ServicesDB();
        database.mealsTable.find()
        .exec()
        .then((meal) => {
            if (meal) {
                let x = meal;
                let y = [];
                x.forEach((ele) => {
                    if (ele.istop){
                    y.push({
                        url: ele.image,
                        caption: ele.packagename,
                        des:ele.description,//
                        meal:ele.meals,//
                        Synopsis: ele.synopsis,
                        price:ele.price//
                    });
                }

                })
               
    res.render("home", {
        top:y,
        services: fakeDB.getServices(),
        head: "Home page",
        alter:isalter,
        loggeduser:name
    });
}

    });
})

router.get("/package", (req, res) => {
    database.mealsTable.find()
        .exec()
        .then((meal) => { 
            if (meal) {
                let x = meal;
                let y = [];
                x.forEach((ele) => {
                    y.push({
                        url: ele.image,
                        caption: ele.packagename,
                        des:ele.description,//
                        meal:ele.meals,//
                        Synopsis: ele.synopsis,
                        price:ele.price//
                    });

                })
                // const fakeDB = new packageDB();
                res.render("package", {
                    head: "Package page",
                    package: y,
                    alter:isalter,
                    loggeduser:name
                });
            }

        })
})


module.exports = router;