const 

upload = require ('../middleware/upload'),

  // use the Router module in Express.js
  // This line creates a Router object that offers its own middleware
  // and routing alongside the Express.js app object.
  router = require("express").Router(),

  { PostcreateCategory,
    GetListAllCategories,
    GetdeleteCategoryCtrl,
    PutupdateCategoryCtrl,
    GetSingleCategoryCtrl,
    PostdeleteImageCtrl,
     } = require('../controllers/categoryController');
  

router.post('/',upload.single("image"), PostcreateCategory);

router.get('/listAll', GetListAllCategories);
//delete Product route
router.delete('/delete-category/:id', GetdeleteCategoryCtrl);

//delete Image route
router.post('/delete-image', PostdeleteImageCtrl);


//updateProduct route
router.put('/update-category/:id', upload.single("image"), PutupdateCategoryCtrl); 

//getSingleProduct route
router.get('/get-single-category/:id', GetSingleCategoryCtrl);


module.exports = router;