const userModel = require("../Models/user.model")
const claimModel = require("../Models/claims.model")
const billsModel = require("../Models/bills.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const express = require("express")
//const sendMail=require('../mailer')
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


Router.get('/stats', async (req, res) => {
    try {
        const monthly_bills = await billsModel.aggregate([{
            $group: {
                _id: { $month: "$datedOn" },
                bills: { $sum: "$billAmount" }
            }
        }, {
            $sort: { "_id": 1 }
        }]);

        const monthly_claims = await claimModel.aggregate([{
            $group: {
                _id: { $month: "$createdAt" },
                claims: { $sum: "$totalAmount" }
            }
        }, {
            $sort: { "_id": 1 }
        }]);

        const settled_claims = await claimModel.aggregate([{
            $match: { status: "approved" }
        }, {
            $group: {
                _id: { $month: "$createdAt" },
                count: { $sum: 1 }
            }
        }, {
            $sort: { "_id": 1 }
        }]);

        const category_exps = await billsModel.aggregate([{
            $group: {
                _id: "$category",
                amt: { $sum: "$billAmount" }
            }
        }]);

        const monthly_exps = mergeArrays(monthly_bills, monthly_claims);

        res.status(200).json({ monthly_exps, category_exps, settled_claims });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});
  
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

const mergeArrays = (array1, array2) => {
    const merged = array1.map((item, index) => ({
        _id: item._id,
        bills: item.bills,
        claims: array2[index] ? array2[index].claims : 0
    }));
    return merged;
};

Router.get('/stats', async (req, res) => {
    try {
        const monthly_bills = await billsModel.aggregate([{
            $group: {
                _id: { $month: "$datedOn" },
                bills: { $sum: "$billAmount" }
            }
        }, {
            $sort: { "_id": 1 }
        }]);

        const monthly_claims = await claimModel.aggregate([{
            $group: {
                _id: { $month: "$createdAt" },
                claims: { $sum: "$totalAmount" }
            }
        }, {
            $sort: { "_id": 1 }
        }]);

        const settled_claims = await claimModel.aggregate([{
            $match: { status: "approved" }
        }, {
            $group: {
                _id: { $month: "$createdAt" },
                count: { $sum: 1 }
            }
        }, {
            $sort: { "_id": 1 }
        }]);

        const category_exps = await billsModel.aggregate([{
            $group: {
                _id: "$category",
                amt: { $sum: "$billAmount" }
            }
        }]);

        const monthly_exps = mergeArrays(monthly_bills, monthly_claims);

        res.status(200).json({ monthly_exps, category_exps, settled_claims });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});
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
        const claimbyid=await claimModel.findOne({"cId":cId});
        res.json(claimbyid)
    }
    catch (err){
        console.log(err)
        res.status(500).json({error:'An error occured while retrieving expenses'})
    }
})
Router.get('/bills/:billid',authenticateToken,async (req,res)=>{
    const billId=req.params.billid;
    // const {status}=req.body;
    try{
        const Bill = await billsModel.findOne({"billId":billId})
        if (!Bill) {
            console.log('bill not found',billId);
            return res.status(404).json({ error: 'Bill not found' });
        }
        //console.log("bill found")
        res.json(Bill);
    }
    catch (err){
        console.log(err)
        res.status(500).json({error:'An error occured while retrieving expenses'})
    }
})
Router.put('/bills/:billid',authenticateToken,async (req,res)=>{
    const billId=req.params.billid;
    const {status}=req.body;
    try{
        const {_id} = await billsModel.findOne({"billId":billId})
        const updatedBill = await billsModel.findByIdAndUpdate(
            _id,
            { status: status },
            { new: true } 
        );
       
        if (!updatedBill) {
            console.log('bill not found',billId);
            return res.status(404).json({ error: 'Bill not found' });
        }
        res.json(updatedBill);
    }
    catch (err){
        console.log(err)
        res.status(500).json({error:'An error occured while retrieving expenses'})
    }
})
Router.put('/claimbyid/:id',authenticateToken,async (req,res)=>{
    const cId=req.params.id;
    const { status } = req.body;
    const {remarks}=req.body;
    try{
        const {_id} = await claimModel.findOne({"cId":cId})
        const updatedClaim = await claimModel.findByIdAndUpdate(
            _id,
            { status: status, remarks:remarks },
            { new: true } 
        );
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
        const newClaim = new claimModel(req.body);
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
        const updatedClaim = await claimModel.findByIdAndUpdate(id, req.body, { new: true });
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