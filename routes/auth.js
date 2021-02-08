// require router from express
const router=require('express').Router();
// require bcript
const bcrypt = require('bcrypt');
// require jsonwebtoken
const jwt=require("jsonwebtoken");

//Require the User Schema
const User=require('../models/User');

const isAuth=require('../middlewares/isAuth');
const {
    validator,
     registerRules, 
     loginRules,}
    =require("../middlewares/validator")
// ROute Post api/
router.post('/register',registerRules(),validator, async(req, res)=>{
    const{name, lastName, email, password}=req.body;

    try {
            
       /* //simple volidation
        if(!name || !lastName || !email || !password){
            return res.status(400).json({msg:'Please enter all fiels'});
        }
        */
        //check for existing user
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({msg:"User already exists"})
        }
        
        //create new User
    user=new User({name, lastName, email, password});
    // creacte salt & hsch 
     const salt=10;
    const hashedPassword= await bcrypt.hash(password, salt);
    user.password=hashedPassword;
   
    //save the user 
    await user.save();
    // sign user 
    const payload={id:user._id};
    const token= await jwt.sign(payload, process.env.secretOrKey,{
        expiresIn: '7 days',
      });

    res.status(200).send({msg:'User is registred', user,token});
    } 
    catch (error) {
        res.status(500).send({msg:"server Error"})
    }
});
1// check login user 
router.post("/login", loginRules(), validator, async(req,res)=>{
    const {email,password}=req.body;
    try {
        2// simple validation
        /*if(!email ||!password){
            return res.status(400).send({msg:"please enter all fiels"})
        }*/
        // check existing user 
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).send({msg:'Bad Credentials! email'});
                }
         // check password
const isMatch= await bcrypt.compare(password, user.password);
if (!isMatch){
    return res.status(400).send({msg:'Bad Credentials! password'})
}
 // sign user 
 const payload={id:user._id};
 const token= await jwt.sign(payload, process.env.secretOrKey)
 
res.send({msg:"logged in with success", user, token})
    }catch (error) {
        
            res.status(500).send({msg:"server Error"})
        
    }
});
// process private
router.get('/user', isAuth, (req, res) => {
    res.status(200).send({ user: req.user });
  });
module.exports=router; 
