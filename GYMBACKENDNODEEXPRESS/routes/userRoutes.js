"use strict";

const
 // use the Router module in Express.js
  router = require("express").Router(),
  usersController = require("../controllers/userController");

// Add a route to handle POST requests to the register option
  router.post("/register",usersController.register);

// Add a route to handle POST requests to the login option
router.post("/login", usersController.login);

// Add a route to handle GET requests to the GETALLUSERS option
router.get("/allusers", usersController.GETALLUSERS);

// Add a route to handle GET requests to the USEREMAILCHECK option
router.get("/uemailcheck/:uemail", usersController.GETUSEREMAILCHECK);

// Add a route to handle GET requests to the GETUSERBYID option
router.get("/getuser/:userid", usersController.GETUSERBYID );

// Add a route to handle put requests to the GetUserByIdAndUpdate option
router.put("/updateuser/:userid", usersController.GetUserByIdAndUpdate );

// Add a route to handle put requests to the GetUserByIdAndUpdate option
router.put("/updatepackage/:userid", usersController.GetPackageByIdAndUpdate );


// Add a route to handle get requests to the profile view option
router.get("/profile/:userid", usersController.GetProfileData );

// Add a route to handle put requests to the cart view option 
router.put("/cart", usersController.PutCartEdit );


module.exports = router;
