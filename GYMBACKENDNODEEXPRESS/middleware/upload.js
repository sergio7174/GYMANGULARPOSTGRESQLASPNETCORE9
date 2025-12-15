const
multer = require("multer"),
  fs = require("fs");
 
 const storage = multer.diskStorage({
   destination: function(req, file, cb) {
     cb(null, "./uploads/");
   },
   filename: function(req, file, cb) {
     cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
   }
 });

 const upload = multer({
   storage: storage,
   fileFilter: function(req, file, callback) {
     if (
       file.mimetype !== "image/png" &&
       file.mimetype !== "image/jpg" &&
       file.mimetype !== "image/jpeg"
     ) {
       return callback(new Error("Only images are allowed"));
     }
     callback(null, true);
   },
   limits: {
     fileSize: 1024 * 1024 * 5
   }
 });

 module.exports =  upload ;