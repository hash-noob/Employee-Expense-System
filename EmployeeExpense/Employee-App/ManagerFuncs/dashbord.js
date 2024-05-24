const express = require('express')
const Router = express.Router()
const claims = require('../Models/claims.model.js')

const approved=[]
const rejected=[]
const pending=[]

Router.get("/dashbord",async (req,res)=>{
    const mid = req.body.mid;
    if(approved.length==0){ 
        approved=await claims.find({"mid":mid,"status":"Approved"})
    }
    if(rejected.length==0 ){
        rejected= await claims.find({"mid":mid,"status":"Rejected"})
    }
    if(pending.length==0){
        pending= await claims.find({"mid":mid,"status":"Pending"})
    }

    res.json([approved,rejected,pending])
})