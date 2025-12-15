const 

User = require('../models/user'),
dotenv=require('dotenv'),
jwt= require('jsonwebtoken'),
bcrypt = require("bcrypt");

dotenv.config();

process.env.TOKEN_KEY = "Sergio";
process.env.TOKEN_EXPIRY = new Date().setDate(new Date().getDate() + 1)

exports.signUp = async(req, res) => {

    console.log("Estoy en PackController - line 15 - req.file.path:  "+req.file.path);

    try {

    console.log('Estoy en authController - line 17 - signUp controller - body',req.body)
    console.log('Estoy en authController - line 18 - signUp controller - body.fullName',req.body.fullName)
    console.log('Estoy en authController - line 19 - signUp controller - email.fullName',req.body.email)
    console.log('Estoy en authController - line 20 - signUp controller - password.fullName',req.body.password)
    console.log('Estoy en authController - line 20 - signUp controller - password.isAdmin',req.body.isAdmin)



    if (!(req.body.email && req.body.password)) {
        return res.status(200).json({ message: 'Email and password not present' })
        
    }

    const emailExists = await User.findOne({ email: req.body.email });

    console.log("Estoy en  authController - line 34 - emailExists:  "+ emailExists);


    if (emailExists) {

        console.log("Estoy en  authController -Dentro de emailExist- line 25 - emailExists:  "+ emailExists);

        return res.status(200).json({ message: 'Email already exits' })
        //return res.status(400).json({ message: 'Email already exits' })
    }

       /** changing the password to save it with cripto*/
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        const GetUserParams = new User({
            
            fullName: req.body.fullName,
            email:    req.body.email,
            password: req.body.password,
            isAdmin:  req.body.isAdmin,
            image:    req.file.path 
        });


    
        const newUser = new User(GetUserParams)
        newUser.save()



    //return res.status(200).send({ success: true, message: 'Register Successful' })
    
    return res.status(200).json({newUser, message: 'User Register Successfully ..'})
} catch (error) {
    console.log(error);
    res.status(200).send({ success: false, message: `Register api issue : ${error.message}`.bgRed.black, error })
}
}

exports.login = async(req, res) => {
    

    //console.log('body',req.body)
    //console.log('Estoy en authController - line 80 - login controller - query: '+req.body)
    
    const email = req.body.email;
    const password = req.body.password;

    //console.log("Estoy en authcontroller - login - line 63, email: "+email);
    //console.log("Estoy en authcontroller - login - line 64, password: "+password);
    
    const user = await User.findOne({ email })

    if (!user) {
      
        console.log ("Estoy en authcontroller - login - line 71 - not user");
        return res.status(200).json({ message: "User does not exists" })

        //return res.status(409).json({ message: "User does not exists" })
      
    }
   // the compare function needs the await command to work ..
    const isMatchedPassword = await bcrypt.compare(req.body.password, user.password);

        if (!isMatchedPassword) {

            console.log("Estoy en authController - login - line 80 - mensajeNotOk: Invalid Credentials .....")

            return res.status(200).send({ message: 'Invalid Credentials!, Incorrect Password ..' });
        }
    
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY, { expiresIn: "1d" })
        return res.status(200).json({ user: user, token: token, message: 'Login Successful' })
}

const UserModel = require('../models/user')



exports.getAllAdmin = async(req, res) => {

    console.log ("Estoy en authcontroller - getAllAdmin - line 100 - ");

    let haveAdmin = await UserModel.find({ isAdmin: 'true' });
        try {

        /***If there is data in database ***/    
        if (haveAdmin.length>0){
                
           console.log ("Estoy en authcontroller - getAllAdmin - line 108 - haveAdmin: haveAdmin found, data in database:"+haveAdmin);

            return res.status(200).json({haveAdmin: haveAdmin})}
                
        /*if (haveAdmin==null) {

            console.log ("Estoy en authcontroller - getAllAdmin - line 113 - haveAdmin: NULL - empty database.");
                res.status(500).send({message: 'Empty Database !'})
            }*/         
         else { 
            haveAdminfalse = 'false';
            console.log('Register api issue, IsAdmin not found .. !, maybe Not Data in Database. haveAdmin:'+haveAdmin);
            return res.status(200).json({ message: 'Register api issue, IsAdmin not found .. !, maybe Not Data in Database.', haveAdmin:haveAdminfalse });
}}catch (error) {
    console.log(error);
    res.status(200).send({ message: `Register api issue : ${error.message}`.bgRed.black, error })

} 

}       