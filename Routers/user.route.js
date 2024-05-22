const userModel = require("../Models/user.model")
const loginModel = require("../Models/login.model")
const bcrypt = require("bcrypt")
const express = require("express")
const Router = express.Router() 

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


Router.post("/signup",async(req,res)=>{
    const exists = await userModel.find({email:req.body.email})
    console.log(exists)
    if(exists.length!==0){
        res.send("User already exists")
    }
    else{
        const plainPassword = req.body.password
        req.body.password=await hashPassword(plainPassword);
        user=await userModel.create(req.body)
        login = await loginModel.create({
            email:req.body.email,
            password:req.body.password
        })
        res.json(user)
    }
})

Router.post("/login",async(req,res)=>{
    const user = await loginModel.find({email:req.body.email})
    if(user.length===0){
        res.status(404).send("User doesn't exist");
    }
    else{
        const match = await bcrypt.compare(req.body.password,user[0].password)
        if(match){
            res.send("Login success");
        }
        else{
            res.status(401).send("Invalid cred");
        }
    }
})

module.exports = Router 