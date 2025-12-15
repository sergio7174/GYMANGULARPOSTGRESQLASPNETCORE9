const 

upload = require ('../middleware/upload'),

  // use the Router module in Express.js
  // This line creates a Router object that offers its own middleware
  // and routing alongside the Express.js app object.
  router = require("express").Router(),

  { PostCreatePack,
    GetListAllPackes,
    GetDeletePackCtrl,
    PutUpdatePackCtrl,
    GetSinglePackCtrl,
    PostDeleteImageCtrl,
     } = require('../controllers/packController');
  

router.post('/',upload.single("image"), PostCreatePack);

router.get('/listAll', GetListAllPackes);
//delete Product route
router.delete('/delete-pack/:id', GetDeletePackCtrl);

//delete Image route
router.post('/delete-image', PostDeleteImageCtrl);


//updateProduct route
router.put('/update-pack/:id', upload.single("image"), PutUpdatePackCtrl); 

//getSingleProduct route
router.get('/get-single-pack/:id', GetSinglePackCtrl);


module.exports = router;