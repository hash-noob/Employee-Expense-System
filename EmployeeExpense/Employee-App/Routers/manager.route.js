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
