const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req,res) =>{
  const { name, email, password} = req.body;

  try{
    let user = await User.findOne({email});
    if(user){
      return res.status(400).json({msg : "User already exists"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    user = new User({name, email, password : hashpassword});
    await user.save();

    res.status(201).json({msg : "User Registered Successfully"});
  }catch(err){
    console.error("Signup Error:", err);
    res.status(500).json({ msg: "Server error", err });
  }
};

exports.login = async(req,res) =>{
  const {email,password} =req.body;
  try{
     const user = await User.findOne({email});
      if(!user){
       return res.status(400).json({ msg: "Invalid credentials" });
      }
     const isMatch = await bcrypt.compare(password, user.password);
       if(!isMatch){
        return res.status(400).json({ msg: "Invalid credentials" });
      }

     const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn : "1h"});
     res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  }catch(err){
     res.status(500).json({ msg: "Server error" });
   }
};