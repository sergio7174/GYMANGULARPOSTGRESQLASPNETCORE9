const 

upload = require ('../middleware/upload'),

  // use the Router module in Express.js
  // This line creates a Router object that offers its own middleware
  // and routing alongside the Express.js app object.
  router = require("express").Router(),

  { PostCreateMember,
    GetListAllMembers,
    GetDeleteMemberCtrl,
    PutUpdateMemberCtrl,
    PostDeleteImageCtrl,
    GetSingleMemberbyemailCtrl
    /*GetSingleMemberCtrl,*/
   
     } = require('../controllers/memberController');
  

router.post('/',upload.single("image"), PostCreateMember);     
router.get('/listAll', GetListAllMembers);
//delete Product route
router.delete('/delete-member/:id', GetDeleteMemberCtrl); 
//delete Image route
router.post('/delete-image', PostDeleteImageCtrl);

//updateProduct route
router.put('/update-member/:id', upload.single("image"), PutUpdateMemberCtrl);


//getSinglemember route
router.get('/get-single-memberbyemail/:email', GetSingleMemberbyemailCtrl);


module.exports = router;