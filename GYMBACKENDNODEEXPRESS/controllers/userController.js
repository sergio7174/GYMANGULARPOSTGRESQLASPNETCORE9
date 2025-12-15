"use strict";

const

  User = require("../models/user"),
  Package = require ("../models/package"),
  passport = require("passport"),
  jwt= require('jsonwebtoken'),
  ObjectId = require('mongoose').Types.ObjectId,

  // This function is reused throughout the controller to organize user attributes
  // in one object. You should create the same functions for your other model controllers.
  getUserParams = body => {
    return {
      fname:  body.fname,
      lname: body.lname,
      userage: body.userage,
      gender: body.usergender,
      uemail: body.uemail,
      userphone: body.userphone,
      userpass: body.userpass,
      };};

  process.env.TOKEN_KEY = "Sergio";
  process.env.TOKEN_EXPIRY = new Date().setDate(new Date().getDate() + 1)

// Export object literal with all controller actions.
module.exports = {

register: async(req, res) => {



          if (!(req.body.uemail && req.body.userpass)) {
            return res.status(400).json({ message: 'Email and password not present' })
        }
        const { uemail, userpass } = req.body;

        const emailExists = await User.exists({ uemail })


        if (emailExists) {
            return res.status(400).json({ message: 'Email already exits' })}

        const newUser = new User(req.body);
        newUser.save()

        return res.status(200).json(newUser)
        },
// login action
       login: async(req, res) => {


            const { uemail, userpass } = req.body;

            const user = await User.findOne({ uemail })
            if (!user) {
                return res.status(409).json({ message: "User does not exists" })
            }
            if (!(user.userpass == userpass)) {
                return res.status(409).json({ message: 'Incorrect userpass' })
            }
            const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY, { expiresIn: process.env.TOKEN_EXPIRY }, );
            // save user token
            user.token = token;

            let data=user;

            res.json( data );
        },

        // Add a Action to handle GET requests to the GETALLUSERS option

    GETALLUSERS: (req, res) => {
            User.find()
              .then(data => {
                 // Send saved data to the next then code block.
                 // Store the user data on the response and call the next middleware function.
                 {res.json(data);}

              })
              // Log error messages and redirect to the home page.
              .catch(error => {
                res.status(403).json("Error in Finding the Doc");

              });
          },

// Add a route to handle GET requests to the USEREMAILCHECK option
GETUSEREMAILCHECK: (req, res) => {


  console.log(req.params.uemail);

  User.find({ uemail: req.params.uemail })
  .then(data => {
     // Send saved data to the next then code block.
     // Store the user data on the response and call the next middleware function.
     {res.json(data);}

  })
  // Log error messages and redirect to the home page.
  .catch(error => {
    res.status(403).json("Error in Finding the Doc");

  });},

  // Add a action to handle GET requests to the GETUSERBYID option

  GETUSERBYID: (req, res) => {


    // when use id as parameter the seek action IT MUST BE
    // findByID - and not Only "find" - it wont send back Data to front End
    // using find only ---- SO IMPORTANT ********

    console.log(req.params.userid);

    User.findById({ _id: req.params.userid })
    .then(data => {
       // Send saved data to the next then code block.
       // Store the user data on the response and call the next middleware function.
       console.log("Estoy en userController - GETUSERBYID - line 122 -data:"+data)
       {res.json(data)}

    })
    // Log error messages and redirect to the home page.
    .catch(error => {
      res.status(403).json("Error in Finding the Doc");

    });},

  // Add a route to handle put requests to the GetUserByIdAndUpdate option

  GetUserByIdAndUpdate: (req, res) => {
    console.log("Estoy en GetUserByIdAndUpdate - line 135 -req.body: "+req.body);
    console.log("Estoy en GetUserByIdAndUpdate - line 136 - req.body.lname: "+req.body);
    console.log("estoy en GetUserByIdAndUpdate - findByIdAndUpdate - line 136 -req.params.id:"+req.params.userid)
    let newId = req.params.userid;
    console.log("estoy en GetUserByIdAndUpdate - findByIdAndUpdate - line 138 newId:"+newId)

    if(!ObjectId.isValid(req.params.userid)){
    return res.status(400).send('No record with given Id ');}


      var userData = {
        Fname : req.body.Fname,
        lname : req.body.lname,
        userage: req.body.userage,
        uemail : req.body.uemail,
        gender :req.body.gender,
        userphone : req.body.userphone,
        userpass: req.body.userpass,

    };

    /*  var packageData = {

        level:      req.body.level,
        isbath:     req.body.isbath,
        istrain:    req.body.istrain,
        isdietplan: req.body.isdietplan
}*/

    console.log("estoy en GetUserByIdAndUpdate - findByIdAndUpdate - line 169 -req.params.id:"+req.params.userid)
    console.log("estoy en GetUserByIdAndUpdate - findByIdAndUpdate - line 170 -req.body.userage:"+req.body.userage)



    // Use findByIdAndUpdate to locate a user by ID and update the document record in one command.
    User.findByIdAndUpdate(newId, {
      // This method takes an ID followed by parameters you’d like to replace for that document
      //  by using the $set command
          $set: userData
        }).then(data => {

      // Add user to response as a local variable, and call the next middleware function.
      //res.json("User data updated successfully");
      console.log("Estoy en GetUserByIdAndUpdate - findByIdAndUpdate - line 191 + data: "+data)
      res.locals.data = data;
      res.send(data);
          })
          .catch(error => {
            console.log('Error in Update User : '+JSON.stringify(error,undefined,2));

          });


  },

  GetPackageByIdAndUpdate: (req, res) => {

    console.log("estoy en GetUserByIdAndUpdate - findByIdAndUpdate - line 206 -req.params.id:"+req.params.userid)
    let newId = req.params.userid;
    console.log("estoy en GetUserByIdAndUpdate - findByIdAndUpdate - line 208 newId:"+newId)

    if(!ObjectId.isValid(req.params.userid)){
    return res.status(400).send('No record with given Id ');}



     var packageData = {

        id: newId,
        level:      req.body.level,
        isbath:     req.body.isbath,
        istrain:    req.body.istrain,
        isdietplan: req.body.isdietplan
}

    // Use findByIdAndUpdate to locate a user by ID and update the document record in one command.
    Package.findOneAndUpdate(newId, {
      // This method takes an ID followed by parameters you’d like to replace for that document
      //  by using the $set command
          $set: packageData
        }).then(data => {

      // Add user to response as a local variable, and call the next middleware function.
      //res.json("User data updated successfully");
      console.log("Estoy en GetUserByIdAndUpdate - findByIdAndUpdate - line 239 + data: "+data)
      res.locals.data = data;
      res.send(data);
          })
          .catch(error => {
            console.log('Error in Update User : '+JSON.stringify(error,undefined,2));

          });},

// Add an action to handle get requests to the profile view option

GetProfileData: (req, res) => {
  console.log(req.params.userid);

  User.findById({ _id: req.params.userid })
  .then(data => {
     // Send saved data to the next then code block.
     // Store the user data on the response and call the next middleware function.
     console.log("Estoy en userController - GetProfileData - line 255 -data:"+data)
     {res.json(data)}

  })
  // Log error messages and redirect to the home page.
  .catch(error => {
    res.status(403).json("Error in Finding the Doc");

  });},

// Add an action to handle put requests to the cart view option

PutCartEdit: (req, res) => {

  console.log(req.body);

  const condition = { _id: req.body._id };
  const newValues = { $set: { date:req.body.date, pack:req.body.pack, level: req.body.level, isdietplan: req.body.isdietplan, istrain: req.body.istrain, payment: req.body.payment, isbath: req.body.isbath , paid:req.body.paid, coupon:req.body.coupon } }

  /*db.collection("users").update(condition, newValues, (error, data) => {

      if (error) {
          res.status(403).json("Error in Finding the Doc");
      }
      else {
          res.json("User data updated successfully");
      }})*/

      console.log("estoy en GetUserByIdAndUpdate - findByIdAndUpdate - line 206 -req.params.id:"+req.params.userid)
      let newId = req.params.userid;
      console.log("estoy en GetUserByIdAndUpdate - findByIdAndUpdate - line 208 newId:"+newId)
  
      if(!ObjectId.isValid(req.params.userid)){
      return res.status(400).send('No record with given Id ');}
  
  
  
       var packageData = {
  
          id: newId,
          level:      req.body.level,
          isbath:     req.body.isbath,
          istrain:    req.body.istrain,
          isdietplan: req.body.isdietplan
  }
  
      // Use findByIdAndUpdate to locate a user by ID and update the document record in one command.
      Package.findOneAndUpdate(newId, {
        // This method takes an ID followed by parameters you’d like to replace for that document
        //  by using the $set command
            $set: packageData
          }).then(data => {
  
        // Add user to response as a local variable, and call the next middleware function.
        //res.json("User data updated successfully");
        console.log("Estoy en GetUserByIdAndUpdate - findByIdAndUpdate - line 239 + data: "+data)
        res.locals.data = data;
        res.send(data);
            })
            .catch(error => {
              console.log('Error in Update User : '+JSON.stringify(error,undefined,2));
  
            });
    
    
    
    
    
    }


}
