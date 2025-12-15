const 

Staff = require('../models/staff'),
dotenv=require('dotenv'),
fs = require('fs'),
path = require('path');


// function to create Staff
exports.PostCreateStaff = async(req, res) => {

   
   console.log("Estoy en StaffController - line 13 - req.file.path:  "+req.file.path);

   // Get the current date
const currentDate = new Date();

// Add timedays days to the current date

//const futureDate = new Date(currentDate.getTime() + ((req.body.timedays) * 24 * 60 * 60 * 1000)); // Add timedays to get finish Staff time

    const GetStaffParams = new Staff({
    
        name:     req.body.name,
        email:    req.body.email,
        age:      req.body.age,
        id_card:  req.body.id_card,
        phone:    req.body.phone,
        address:  req.body.address,        
        gender:   req.body.gender,
        field:    req.body.field,
        createdAt:new(Date),
        image:    req.file.path 
    
    });

    const NewStaff = new Staff(GetStaffParams);
    NewStaff.save();
  
        console.log('Im at line 40 - create staff - NewStaff: true');

        return res.status(200).send({NewStaff:'true', message: "Staff Created Successfully .."})

}


// function to list all Staffs
exports.GetListAllStaff = async(req, res) => {

    console.log("Estoy en StaffController - line 50 - GetListAllStaffs");
        
            try {
                const Staffs = await Staff.find({}).limit(12).sort({ createdAt: -1 });

               console.log("Estoy en StaffController - line 55 - GetListAllStaffs name: "+ Staffs[0].name); 

                res.status(200).send({ message: 'All Staffs fetched successfully', total: Staffs.length, Staffs })
            } catch (error) {
                console.log(error);
                res.status(200).send({ message: `get all Staffs api issue : ${error}`, error })
            }
              
    
}

// end of the block of list all Staffs


// function to delete a Staff Image from Uploads dir when Staff is erased

exports.PostDeleteImageCtrl= async(req, res) => {

    const Image = req.body.image;
    const filePath = Image;

    console.log("Estoy en StaffController - line 72 - GetDeleteImageCtrl - image: ");

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


// function to delete a Staff

exports.GetDeleteStaffCtrl= async(req, res) => {
    
    console.log("Estoy en StaffController - line 94 - GetDeleteStaffCtrl - id: "+req.params.id);

    /*** End of block to erase image in uploads dir *****/
    try {

        await Staff.findByIdAndDelete(req.params.id);
    
        res.status(200).send({ message: 'Staff Deleted Successfully' });
    } catch (error) {
        console.log(error);
        res.status(200).send({ message: `delete Staff api issue : ${error}`, error })
    }
    
}
// End of block function to delete a Staff

// function to Edit a Saved Staff

exports.PutUpdateStaffCtrl= async(req, res) => {

    console.log("Estoy en StaffController - line 113 - PutupdateStaffCtrl - req.params.id: "+req.params.id);

        await Staff.findByIdAndUpdate(req.params.id, { 
            // if was the only way I could find to save those
            // items with findByIdAndUpdate, not using const StaffToUpdate = { req.body }, etc.....

        name:     req.body.name,
        email:    req.body.email,
        age:      req.body.age,
        id_card:  req.body.id_card,
        phone:    req.body.phone,
        address:  req.body.address,        
        gender:   req.body.gender,
        image:    req.file.path  
            
             }, { new: true })

            .then(updatedStaff => {
          if (updatedStaff) {

            console.log('Staff updated successfully:', updatedStaff);
            
            res.status(200).send({ message: 'Staff updated successfully',  updatedStaff })
          } else {
            res.status(200).send({ message: 'Staff Not updated successfully'})
            console.log('Staff not found');
          }
        })
        .catch(error => {
          console.error('Error updating Staff:', error);
        })    
    } 
    
  // function to get a simple Staff
    exports.GetSingleStaffCtrl= async(req, res) => {

        try {
            
            console.log("Estoy en GetSingleStaffCrtl - line 155 - req.params.id: "+req.params.id);

            const staff = await Staff.findById({ _id: req.params.id });
           
            console.log(staff);

            res.status(200).send({ message: 'Single Staff Fetched Successfully', staff })
        } catch (error) {
            console.log(error); 
            res.status(500).send({ message: `get single Staff api issue : ${error}`, error })
        } } // End of Get simgle Staff by id