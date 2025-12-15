const 

upload = require ('../middleware/upload'),

  // use the Router module in Express.js
  // This line creates a Router object that offers its own middleware
  // and routing alongside the Express.js app object.
  router = require("express").Router(),

  { PostCreateStaff,
    GetListAllStaff,
    GetDeleteStaffCtrl,
    PutUpdateStaffCtrl,
    GetSingleStaffCtrl,
    PostDeleteImageCtrl,
     } = require('../controllers/staffController');
  

router.post('/',upload.single("image"), PostCreateStaff);

router.get('/listAll', GetListAllStaff);

//delete Staff route
router.delete('/delete-Staff/:id', GetDeleteStaffCtrl);

//delete Image route
router.post('/delete-image', PostDeleteImageCtrl);

//update Staff route
router.put('/update-Staff/:id', upload.single("image"), PutUpdateStaffCtrl); 

//get Single Staff route
router.get('/get-single-Staff/:id', GetSingleStaffCtrl);


module.exports = router;