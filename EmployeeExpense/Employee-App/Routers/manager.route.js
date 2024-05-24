const express = require('express')
const Router = express.Router()
const managerModel = require("../Models/manager.model")
const claims = require('../Models/claims.model.js')

const approved=[]
const rejected=[]
const pending=[]


Router.post("/signup",async (req,res)=>{
    
        result =await managerModel.create(req.body)
        res.send(result)
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