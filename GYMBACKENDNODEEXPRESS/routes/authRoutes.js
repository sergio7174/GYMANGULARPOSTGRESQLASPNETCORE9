const 
express = require('express'),
upload = require ('../middleware/upload'),

  // use the Router module in Express.js
  // This line creates a Router object that offers its own middleware
  // and routing alongside the Express.js app object.
  router = require("express").Router(),
  { signUp, login, getAllAdmin } = require('../controllers/authcontroller');

// signUp route - home view - menu option Signup
  router.post('/signUp', upload.single("image"), signUp);
// signUp route - home view - menu option login
  router.post('/login', login);
// Getalladmin route - for checking if there is an admin
  router.get('/getalladmin', getAllAdmin);


module.exports = router;