const userModel = require("../Models/user.model")
const claimsModel = require("../Models/claims.model")
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
  Router.get('/claims', authenticateToken, async (req, res) => {
    try {
        const claims = await claimModel.find({
            mId: req.user.eId,
            status: { $in: ['approved', 'rejected'] }
        }).sort({ updatedAt: -1 });

        res.json(claims);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while retrieving claims' });
    }
})

Router.post('/bills',authenticateToken,async (req,res)=>{
    const bills = req.body;
    try{
        const billsArray = await billsModel.find({billId:{ $in: bills}})
        res.json(billsArray)
    }catch(err){
        console.log(err)
    }
})



Router.get('/claimbyid/:id',authenticateToken,async (req,res)=>{
    const cId=req.params.id;

    try{
        const claimbyid=await claimsModel.findOne({"cId":cId});
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
    console.log("outside")
    try{
        const updatedClaim = await claimsModel.findOneAndUpdate(
            {"cId":cId},
            { status: status } 
        );
        console.log(updatedClaim)
        
        

        if (!updatedClaim) {
            console.log('claim not found',cId);
            return res.status(404).json({ error: 'Claim not found' });
        }

        res.json(updatedClaim);
       
    }
    catch (err){
        console.log(err)
        res.status(500).json({error:'An error occured while retrieving expenses'})
    }
})
Router.delete('/claimbyid/:id',authenticateToken,async (req,res)=>{
    const cId=req.params.id;
    try{
        const {_id} = await claimsModel.findOne({"cId":cId})
        const updatedClaim = await claimsModel.findByIdAndDelete(_id)
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
Router.get('/pending-claims/',authenticateToken,async (req, res) => {
    try {
        const pendingBills = await claimModel.find({mId: req.user.eId,
            status:'pending'});
        res.json(pendingBills);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving expenses' });
    }
});

Router.get('/approved-claims/',authenticateToken, async (req, res) => {

    try {
        const approvedBills = await claimModel.find({mId: req.user.eId,status:'approved'});
        res.json(approvedBills);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving expenses' });
    }
});
Router.get('/rejected-claims/',authenticateToken,async (req, res) => {

    try {
        const rejectedBills = await claimModel.find({mId: req.user.eId,status:'rejected'});
        res.json(rejectedBills);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving expenses' });
    }
});
Router.get('/bills/:claimId', authenticateToken, async (req, res) => {
    const { claimId } = req.params;
  
    try {
      const bills = await billsModel.find({ cId: claimId });
      res.json(bills);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while retrieving bills' });
    }
  });
  Router.post('/claims', authenticateToken, async (req, res) => {
    try {
        const newClaim = new claimsModel(req.body);
        await newClaim.save();
        res.status(201).json(newClaim);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create new claim' });
    }
});
Router.put('/claims/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const updatedClaim = await claimsModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedClaim) {
            return res.status(404).json({ error: 'Claim not found' });
        }
        res.json(updatedClaim);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update claim' });
    }
});
Router.get('/:billid', authenticateToken, async (req, res) => {
    const { billid } = req.params;
    try {
      const bills = await billsModel.find({ billId: billid });
  
      if (bills.length === 0) {
        return res.status(404).json({ error: 'No bills found with the provided ID' });
      }
  
      res.json(bills);
    } catch (err) {
      console.error('Error retrieving bills:', err);
      res.status(500).json({ error: 'An error occurred while retrieving bills' });
    }
  });
Router.get('/profile', authenticateToken, async (req, res) => {
    try {
        // Assuming user data is stored in userModel
        const manager = await userModel.findById(req.user.eId);
        if (!manager) {
            return res.status(404).json({ error: 'Manager not found' });
        }
        res.json(manager);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch manager profile' });
    }
});

  
module.exports=Router