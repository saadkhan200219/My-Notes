const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
//importing bctypt to encrypt my password in database
const bcrypt = require('bcryptjs')
//importing jsonwebtoken to generate a authentication token 
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'helloW@r|d'
const fetchuser = require("../middleware/fetchuser");


// create user
router.post(
  "/createuser",
  [
    body("name", "name must be greater then 5 char").isLength({ min: 5 }),
    body("email", "invalid email").isEmail(),
    body("password", "password length must be most then  5 ").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false
    //here validationResult return value only if there are any error in req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    try {
      //here in email all the email of db are stored and it is checking if it matches the req.body.email
      
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success,error: "Email already exists" });
      }
      //encrypting password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id, 
        },
      };
      //creating an authentication token 
      const authToken = jwt.sign(data, JWT_SECRET)
      console.log(authToken)
      success = true
      res.json({success,authToken})
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

//authenticate login
router.post(
  "/login",
  [
    body("email", "invalid email").isEmail(),
    body("password", "password canot be blank").exists()
  ],async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body
    try {
      let user = await User.findOne({email})
      if(!user){
        return res.status(400).json({  success ,error:"Incorrect Email"})
        success = false
      }
      const passwordcompare = await bcrypt.compare(password, user.password)
      if(!passwordcompare){
        return res.status(400).json({ success , error:"Incorrect Password"})
        success = false
      } 
      const data = {
        user:{
          id:user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET)
      success = true
      res.json({success , authToken})
    } catch (error) {
      console.log(error)
    }
  })


router.post(
  "/getuser",fetchuser, async (req, res)=>{
    try{
      userId = req.user.id
      const user = await User.findById(userId).select("-password")
      res.send(user)
    }catch (error){
      console.log(error.message)
    }
  }
)










module.exports = router;
