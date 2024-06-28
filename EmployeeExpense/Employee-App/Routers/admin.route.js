const express=require('express')
const bcrypt= require("bcryptjs")
//const userModel = require("../Models/user.model")
const userModel = require("../Models/user.model")
const claimModel = require("../Models/claims.model")
const Router=express.Router()
const jwt = require("jsonwebtoken")

let activities = [];

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, "secretKey", (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }

  async function hashPassword(plainPassword) {
    const saltRounds = 10;
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(plainPassword, salt);
      return hash;
      // Store the hash in your database
    } catch (err) {
      console.log(err);
    }
}

Router.post("/addUser",async(req,res)=>{
    const exists = await userModel.find({eId:req.body.eId})
    if(exists.length!==0){
        res.send("User already exists")
    }
    else{
        const plainPassword = req.body.password
       
        req.body.password=await hashPassword(plainPassword);
        user=await userModel.create(req.body)
        console.log(req.body)
        res.json(user.password)
    }

})


Router.get('/',authenticateToken,async(req,res)=>{
    const users=await userModel.find({})
    res.status(200).json(users)
})

Router.get('/stats',async(req,res)=>{
    try {
        console.log("start")
        const userCount = await userModel.countDocuments({});
        console.log(`User count: ${userCount}`);
        const managerCount = await userModel.countDocuments({ role: 'manager'});
        //const claimCount = await Claim.countDocuments({ week: new Date().getWeekNumber() });
        console.log(userCount);
        res.json({ userCount, managerCount});
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
})

Router.get('/:id',async(req,res)=>{
    let eId=req.params.id
    const user=await userModel.find({eId:eId})
    res.status(200).json(user)
})






Router.delete('/:id',authenticateToken,async(req,res)=>{
    let eId=req.params.id
    const {_id}=await userModel.findOne({"eId":eId})
    const userdel=await userModel.findByIdAndDelete(_id)
    if(!userdel){
        res.status(500).json({ error: 'An error occurred while deleting users' });
    }
    else{
        res.status(200).json("Student with given id deleted")
    }
})
Router.put('/:id',authenticateToken,async(req,res)=>{
    let eId=req.params.id
    const {_id}=await userModel.findOne({"eId":eId})
    const userupdated=await userModel.findByIdAndUpdate(_id,req.body)
    if(userupdated){
        res.status(200).json(userupdated)
    }
    else{
        res.status(404).send("error")
    }
})

Router.get('/activities', (req, res) => {
    res.json(activities);
  });
  
  // Add activity
  Router.post('/activities', (req, res) => {
    const activity = req.body;
    activities.unshift(activity);
    if (activities.length > 50) activities = activities.slice(0, 50);
    res.status(201).json(activity);
  });

module.exports = Router