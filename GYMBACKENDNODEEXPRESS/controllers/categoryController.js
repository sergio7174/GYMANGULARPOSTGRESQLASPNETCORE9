const 

Category = require('../models/Category'),
dotenv=require('dotenv'),
fs = require('fs'),
path = require('path');


// function to create Category
exports.PostcreateCategory = async(req, res) => {

   
   console.log("Estoy en CategoryController - line 13 - req.file.path:  "+req.file.path);

    const GetCategoryParams = new Category({
        name:        req.body.name,
        description: req.body.description,
        image:       req.file.path 
    });

    const NewCategory = new Category(GetCategoryParams);
    NewCategory.save();
    return res.status(200).send({NewCategory, message: "Category Created Successfully .."})
}

// function to list all Categorys
exports.GetListAllCategories = async(req, res) => {

    console.log("Estoy en CategoryController - line 29 - GetListAllCategorys");
        
            try {
                const Categories = await Category.find({}).limit(12).sort({ createdAt: -1 });

               console.log("Estoy en CategoryController - line 35 - GetListAllCategorys: "+Categories); 

                res.status(200).send({ message: 'All Categorys fetched successfully', total: Categories.length, Categories })
            } catch (error) {
                console.log(error);
                res.status(200).send({ message: `get all Categorys api issue : ${error}`, error })
            }
              
    
}

// end of the block of list all Categorys


// function to delete a Category Image from Uploads dir when Category is erased

exports.PostdeleteImageCtrl= async(req, res) => {

    const Image = req.body.image;
    const filePath = Image;

    console.log("Estoy en CategoryController - line 56 - GetDeleteImageCtrl - image: ");

    fs.unlink(filePath, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.status(200).send({ message: 'File not found' });
            }
            return res.status(200).send({ message: 'Error deleting file', error: err });
        }
        res.status(200).json({ message: 'File deleted successfully' ,});
    });



}


// function to delete a Category

exports.GetdeleteCategoryCtrl= async(req, res) => {
    
    console.log("Estoy en CategoryController - line 77 - GetDeleteCategoryCtrl - id: "+req.params.id);

    /*** End of block to erase image in uploads dir *****/
    try {

        await Category.findByIdAndDelete(req.params.id);
    
        res.status(200).send({ message: 'Category Deleted Successfully' });
    } catch (error) {
        console.log(error);
        res.status(200).send({ message: `delete Category api issue : ${error}`, error })
    }
    
}
// End of block function to delete a Category

// function to Edit a Saved Category

exports.PutupdateCategoryCtrl= async(req, res) => {

    console.log("Estoy en CategoryController - line 97 - PutupdateCategoryCtrl - req.params.id: "+req.params.id);

        await Category.findByIdAndUpdate(req.params.id, { 
            // if was the only way I could find to save those
            // items with findByIdAndUpdate, not using const CategoryToUpdate = { req.body }, etc.....

            name:req.body.name,
            description: req.body.description,
            image:req.file.path 
            
             }, { new: true })

            .then(updatedCategory => {
          if (updatedCategory) {

            console.log('Category updated successfully:', updatedCategory);
            
            res.status(200).send({ message: 'Category updated successfully',  updatedCategory })
          } else {
            res.status(200).send({ message: 'Category Not updated successfully'})
            console.log('Category not found');
          }
        })
        .catch(error => {
          console.error('Error updating Category:', error);
        })    
    } 
    
  // function to get a simple Category
    exports.GetSingleCategoryCtrl= async(req, res) => {

        try {
            
            console.log("Estoy en GetSingleCategoryCrtl - line 129 - req.params.id: "+req.params.id);

            const category = await Category.findById({ _id: req.params.id });
           
            console.log(category);

            res.status(200).send({ message: 'Single Category Fetched Successfully', category })
        } catch (error) {
            console.log(error); 
            res.status(500).send({ message: `get single Category api issue : ${error}`, error })
        } } // End of Get simgle Category by id
    

