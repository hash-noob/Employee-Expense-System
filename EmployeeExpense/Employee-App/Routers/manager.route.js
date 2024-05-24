const express = require('express')
const Router = express.Router()
const managerModel = require("../Models/manager.model")
const claimsModel = require("../Models/claims.model")
const claims = require('../Models/claims.model.js')

const approved=[]
const rejected=[]
const pending=[]


Router.post("/signup",async (req,res)=>{
    
        result =await managerModel.create(req.body)
        res.send(result)
})

Router.post("/login", async(req,res)=>{
    const manager = await managerModel.find({mid:req.body.mid})
    if(manager.length===0){
        res.status(404).send("manager doesn't exist");
    }
    else{
        const match = await bcrypt.compare(req.body.password,manager[0].password)
        try{
        //If password matches generate a token and send to client
        if(match){
             const token = jwt.sign(req.body, "secretKey");

            // Send token to client
            res.status(200).send({ token });
            
        }
        else{
            res.status(401).send("Invalid cred");
        }
        } catch (error) {
            res.status(500).send({ message: 'Internal server error' });
        }
        
    }
})

Router.put("/updateStatus",async (req,res)=>{
        const {claimId,status}=req.body;
        const {_id} = await claimsModel.findOne({"claimId":claimId})
        const updatedClaim = await claimsModel.findByIdAndUpdate(_id,{"status":status})
        if(updatedClaim){
            res.status(200).json(updatedClaim)
        }
        else{
            res.status(404).send("error")
        }
}) 


Router.get("/dashboard",async (req,res)=>{
        let pending,approved,rejected
        const mid = req.body.mid;
        approved=await claims.find({"ReviewerId":mid , "status": "Approved" })
        rejected = await claims.find({"ReviewerId":mid,"status":"Rejected"})
        pending = await claims.find({"ReviewerId":mid,"status":"Pending"})
        const result={
                "pending":pending,
                "accepted":approved,
                "rejected":rejected
        }
    
        res.json(result)
})

module.exports = Router