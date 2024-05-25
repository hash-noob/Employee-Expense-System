const express=require('express')
const Router=express.Router()
const jwt = require("jsonwebtoken")
const userModel=require('../Models/user.model')
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

Router.get('/',authenticateToken,async(req,res)=>{
    const users=await userModel.find({})
    res.status(200).json(users)

})
Router.get('/:id',authenticateToken,async(req,res)=>{
    let eid=req.params.id
    const user=await userModel.find({eid:eid})
    res.status(200).json(user)
})
Router.delete('/:id',authenticateToken,async(req,res)=>{
    let eid=req.params.id
    const {_id}=await userModel.findOne({"eid":eid})
    const userdel=await userModel.findByIdAndDelete(_id)
    if(!userdel){
        res.status(500).json({ error: 'An error occurred while deleting users' });
    }
    else{
        res.status(200).json("Student with given id deleted")
    }
})
Router.put('/:id',authenticateToken,async(req,res)=>{
    let eid=req.params.id
    const {_id}=await userModel.findOne({"eid":eid})
    const userupdated=await userModel.findByIdAndUpdate(_id,req.body)
    if(userupdated){
        res.status(200).json(userupdated)
    }
    else{
        res.status(404).send("error")
    }
})
module.exports = Router