const userModel = require("../Models/user.model")
const claimModel = require("../Models/claims.model")
const billsModel = require("../Models/bills.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const express = require("express")
const Router = express.Router()

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
Router.get('/claims',authenticateToken,async (req,res)=>{
    try{
        const totalclaims=await claimModel.find();
        res.json(totalclaims)
    }
    catch (err){
        console.log(err)
        res.status(500).json({error:'An error occured while retrieving expenses'})
    }
})
Router.get('/claimbyid/:id',authenticateToken,async (req,res)=>{
    const cId=req.params.id;

    try{
        const claimbyid=await claimModel.findOne({"cId":cId});
        res.json(claimbyid)
    }
    catch (err){
        console.log(err)
        res.status(500).json({error:'An error occured while retrieving expenses'})
    }
})
Router.put('/claimbyid/:id',authenticateToken,async (req,res)=>{
    const cId=req.params.id;
    const { status } = req.body;
    try{
        const {_id} = await claimModel.findOne({"cId":cId})
        const updatedClaim = await claimModel.findByIdAndUpdate(
            _id,
            { status: status }, // Update the status field
            { new: true } // Return the updated document
        );

        if (!updatedClaim) {
            console.log('claim not found',cId);
            return res.status(404).json({ error: 'Claim not found' });
        }

        res.json(updatedClaim);
        // const {_id} = await claimModel.findOne({"cId":cId})
        // const updatedClaim = await claimModel.findByIdAndUpdate(_id,{ status: status },{ new: true })
        // if(updatedClaim){
        //     res.status(200).json(updatedClaim)
        // }
        // else{
        //     res.status(404).send("error")
        // }
    }
    catch (err){
        console.log(err)
        res.status(500).json({error:'An error occured while retrieving expenses'})
    }
})
Router.delete('/claimbyid/:id',authenticateToken,async (req,res)=>{
    const cId=req.params.id;
    try{
        const {_id} = await claimModel.findOne({"cId":cId})
        const updatedClaim = await claimModel.findByIdAndDelete(_id)
        if(updatedClaim){
            res.status(200).json({message:"claim deleted"})
        }
        else{
            res.status(404).send("error")
        }
    }
    catch (err){
        console.log(err)
        res.status(500).json({error:'An error occured while retrieving expenses'})
    }
})
Router.get('/pending-bills/',authenticateToken,async (req, res) => {
    try {
        const pendingBills = await claimModel.find({"status":"pending"});
        res.json(pendingBills);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving expenses' });
    }
});

Router.get('/approved-bills/',authenticateToken, async (req, res) => {

    try {
        const approvedBills = await claimModel.find({status:'approved'});
        res.json(approvedBills);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving expenses' });
    }
});
Router.get('/rejected-bills/',authenticateToken,async (req, res) => {

    try {
        const rejectedBills = await claimModel.find({status:'rejected'});
        res.json(rejectedBills);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving expenses' });
    }
});
module.exports=Router