const userModel = require("../Models/user.model")
const loginModel = require("../Models/login.model")
const claimModel = require("../Models/claims.model")
const bcrypt = require("bcryptjs")
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
            jwt.sign(req.body.email,"axcd-2346",{expiresIn : "1h" },(err,token)=>{
                if(err){
                    res.send(err)
                }else{
                    res.json({token});
                }
            })
            res.send("Login success");
        }
        else{
            res.status(401).send("Invalid cred");
        }
    }
})

Router.post("/fileClaim",async (req,res)=>{
    result = claimModel.create(req.body)
    res.send(result)
})

module.exports = Router 