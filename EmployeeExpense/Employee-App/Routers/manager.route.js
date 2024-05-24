const express = require('express')
const Router = express.Router()
const managerModel = require("../Models/manager.model")

Router.post("/signup",async (req,res)=>{
    
        result =await managerModel.create(req.body)
        res.send(result)
})

module.exports = Router