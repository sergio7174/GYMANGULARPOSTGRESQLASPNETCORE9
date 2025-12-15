const 

Pack = require('../models/package'),
dotenv=require('dotenv'),
fs = require('fs'),
path = require('path');


// function to create Pack
exports.PostCreatePack = async(req, res) => {

   
   console.log("Estoy en PackController - line 13 - req.file.path:  "+req.file.path);

   // Get the current date
const currentDate = new Date();

// Add timedays days to the current date

const futureDate = new Date(currentDate.getTime() + ((req.body.timedays) * 24 * 60 * 60 * 1000)); // Add timedays to get finish pack time

    const GetPackParams = new Pack({
    
        nameplan:          req.body.nameplan,
        description:       req.body.description,
        trialdays:         req.body.trialdays,
        features:          req.body.features,
        timedays:          req.body.timedays,
        cost:              req.body.cost,        
        code:              req.body.code,
        status:            req.body.status,
        createdAt:         new(Date),
        //finishAt:          futureDate,
        image:             req.file.path 
    
    
    });

    const pack = new Pack(GetPackParams);
    const NewPack = await pack.save();
    console.log("Im in packController - line 41: Pack Created Successfully ..NewPack: "+NewPack);
    return res.status(200).send({NewPack, message: "Pack Created Successfully .."})
}

// function to list all Packs
exports.GetListAllPackes = async(req, res) => {

    console.log("Estoy en PackController - line 46 - GetListAllPacks");
        
            try {
                const packs = await Pack.find({}).limit(12).sort({ createdAt: -1 });

               console.log("Estoy en PackController - line 51 - GetListAllPacks: "+ packs[0].nameplan); 

                res.status(200).send({ message: 'All Packs fetched successfully', total: packs.length, packs })
            } catch (error) {
                console.log(error);
                res.status(200).send({ message: `get all Packs api issue : ${error}`, error })
            }
              
    
}

// end of the block of list all Packs


// function to delete a Pack Image from Uploads dir when Pack is erased

exports.PostDeleteImageCtrl= async(req, res) => {

    const Image = req.body.image;
    const filePath = Image;

    console.log("Estoy en PackController - line 72 - GetDeleteImageCtrl - image: ");

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


// function to delete a Pack

exports.GetDeletePackCtrl= async(req, res) => {
    
    console.log("Estoy en PackController - line 93 - GetDeletePackCtrl - id: "+req.params.id);

    /*** End of block to erase image in uploads dir *****/
    try {

        await Pack.findByIdAndDelete(req.params.id);
    
        res.status(200).send({ message: 'Pack Deleted Successfully' });
    } catch (error) {
        console.log(error);
        res.status(200).send({ message: `delete Pack api issue : ${error}`, error })
    }
    
}
// End of block function to delete a Pack

// function to Edit a Saved Pack

exports.PutUpdatePackCtrl= async(req, res) => {

    console.log("Estoy en PackController - line 113 - PutupdatePackCtrl - req.params.id: "+req.params.id);

        await Pack.findByIdAndUpdate(req.params.id, { 
            // if was the only way I could find to save those
            // items with findByIdAndUpdate, not using const PackToUpdate = { req.body }, etc.....

            nameplan:          req.body.nameplan,
            description:       req.body.description,
            trialdays:         req.body.trialdays,
            features:          req.body.features,
            timedays:          req.body.timedays,
            cost:              req.body.cost,        
            code:              req.body.code,
            status:            req.body.status,
            createdAt:         new(Date),
            //finishAt:          futureDate,
            image:             req.file.path 
            
             }, { new: true })

            .then(updatedPack => {
          if (updatedPack) {

            console.log('Pack updated successfully:', updatedPack);
            
            res.status(200).send({ message: 'Pack updated successfully',  updatedPack })
          } else {
            res.status(200).send({ message: 'Pack Not updated successfully'})
            console.log('Pack not found');
          }
        })
        .catch(error => {
          console.error('Error updating Pack:', error);
        })    
    } 
    
  // function to get a simple Pack
    exports.GetSinglePackCtrl= async(req, res) => {

        try {
            
            console.log("Estoy en GetSinglePackCrtl - line 156 - req.params.id: "+req.params.id);

            const pack = await Pack.findById({ _id: req.params.id });
           
            console.log(pack);

            res.status(200).send({ message: 'Single Pack Fetched Successfully', pack })
        } catch (error) {
            console.log(error); 
            res.status(500).send({ message: `get single Pack api issue : ${error}`, error })
        } } // End of Get simgle Pack by id