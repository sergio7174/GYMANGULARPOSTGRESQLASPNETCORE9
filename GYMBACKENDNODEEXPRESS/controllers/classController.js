const 

Class = require('../models/class'),
dotenv=require('dotenv'),
fs = require('fs'),
path = require('path');


// function to create Class
exports.PostCreateClass = async(req, res) => {

   
   console.log("Estoy en ClassController - line 13 - req.file.path:  "+req.file.path);

   // Get the current date
const currentDate = new Date();

// Add timedays days to the current date

const futureDate = new Date(currentDate.getTime() + ((req.body.session_time) * 24 * 60 * 60 * 1000)); // Add session_time to get finish Class time

    const GetClassParams = new Class({
    
        classname:      req.body.classname,
        code:           req.body.code,
        classday:       req.body.classday,
        classtime:      req.body.classtime,
        classlevel:     req.body.classlevel,
        dateBegin:      req.body.dateBegin,
        dateEndClass:   futureDate,
        session_time:   req.body.session_time,  // number of days     
        price:          req.body.price,
        trainer:        req.body.trainer,
        key_benefits:   req.body.key_benefits,
        expert_trainer: req.body.expert_trainer,
        class_overview: req.body.class_overview,
        why_matters:    req.body.why_matters,
        createdAt:      new(Date),
        //finishAt:          futureDate,
        image:             req.file.path 
    
    
    });

    const Clase = new Class(GetClassParams);
    const NewClass = await Clase.save();
    console.log("Im in ClassController - line 46: Class Created Successfully ..NewClass: "+NewClass);
    return res.status(200).send({NewClass, message: "Class Created Successfully .."})
}

// function to list all Classs
exports.GetListAllClasses = async(req, res) => {

    console.log("Estoy en ClassController - line 53 - GetListAllClasss");
        
            try {
                const classes = await Class.find({}).limit(12).sort({ createdAt: -1 });

               console.log("Estoy en ClassController - line 58 - GetListAllClasss: "+ classes[0].classname); 

                res.status(200).send({ message: 'All Classs fetched successfully', total: classes.length, classes })
            } catch (error) {
                console.log(error);
                res.status(200).send({ message: `get all Classs api issue : ${error}`, error })
            }
              
    
}

// end of the block of list all Classs


// function to delete a Class Image from Uploads dir when Class is erased

exports.PostDeleteImageCtrl= async(req, res) => {

    const Image = req.body.image;
    const filePath = Image;

    console.log("Estoy en ClassController - line 79 - GetDeleteImageCtrl - image: ");

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


// function to delete a Class

exports.GetDeleteClassCtrl= async(req, res) => {
    
    console.log("Estoy en ClassController - line 100 - GetDeleteClassCtrl - id: "+req.params.id);

    /*** End of block to erase image in uploads dir *****/
    try {

        await Class.findByIdAndDelete(req.params.id);
    
        res.status(200).send({ message: 'Class Deleted Successfully' });
    } catch (error) {
        console.log(error);
        res.status(200).send({ message: `delete Class api issue : ${error}`, error })
    }
    
}
// End of block function to delete a Class

// function to Edit a Saved Class

exports.PutUpdateClassCtrl= async(req, res) => {

    console.log("Estoy en ClassController - line 120 - PutupdateClassCtrl - req.params.id: "+req.params.id);

        await Class.findByIdAndUpdate(req.params.id, { 
            // if was the only way I could find to save those
            // items with findByIdAndUpdate, not using const ClassToUpdate = { req.body }, etc.....

        classname:      req.body.classname,
        code:           req.body.code,
        classday:       req.body.classday,
        classtime:      req.body.classtime,
        classlevel:     req.body.classlevel,
        dateBegin:      req.body.dateBegin,
        dateEndClass:   futureDate,
        session_time:   req.body.session_time,  // number of days     
        price:          req.body.price,
        trainer:        req.body.trainer,
        key_benefits:   req.body.key_benefits,
        expert_trainer: req.body.expert_trainer,
        class_overview: req.body.class_overview,
        why_matters:    req.body.why_matters,
        createdAt:      new(Date),
        //finishAt:          futureDate,
        image:             req.file.path 
            
             }, { new: true })

            .then(updatedClass => {
          if (updatedClass) {

            console.log('Class updated successfully:', updatedClass);
            
            res.status(200).send({ message: 'Class updated successfully',  updatedClass })
          } else {
            res.status(200).send({ message: 'Class Not updated successfully'})
            console.log('Class not found');
          }
        })
        .catch(error => {
          console.error('Error updating Class:', error);
        })    
    } 
    
  // function to get a simple Class
    exports.GetSingleClassCtrl= async(req, res) => {

        try {
            
            console.log("Estoy en GetSingleClassCrtl - line 168 - req.params.id: "+req.params.id);

            const clase = await Class.findById({ _id: req.params.id });
           
            console.log(clase);

            res.status(200).send({ message: 'Single Class Fetched Successfully', clase })
        } catch (error) {
            console.log(error); 
            res.status(500).send({ message: `get single Class api issue : ${error}`, error })
        } } // End of Get simgle Class by id