
const express = require('express');
const bcrypt = require("bcryptjs");
const userModel = require("../Models/user.model");
const claimModel = require("../Models/claims.model");
const Router = express.Router();
const jwt = require("jsonwebtoken");

let activities = [];

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log("Token received: ", token); // Log the token received
    if (!token) return res.sendStatus(401);
    jwt.verify(token, "secretKey", (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

async function hashPassword(plainPassword) {
    const saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(plainPassword, salt);
        return hash;
    } catch (err) {
        console.log(err);
    }
}

Router.post("/addUser", authenticateToken, async (req, res) => {
    const exists = await userModel.find({ eId: req.body.eId });
    if (exists.length !== 0) {
        res.send("User already exists");
    } else {
        const plainPassword = req.body.password;
        req.body.password = await hashPassword(plainPassword);
        const user = await userModel.create(req.body);
        res.json(user.password);
    }
});

Router.get('/', authenticateToken, async (req, res) => {
    const users = await userModel.find({});
    res.status(200).json(users);
});

Router.get('/stats', async (req, res) => {
    try {
        const userCount = await userModel.countDocuments({});
        console.log(`User count: ${userCount}`);
        const managerCount = await userModel.countDocuments({ role: 'manager'});

        console.log(userCount);
        res.status(200).json({ userCount, managerCount});
      } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

Router.get('/claims',authenticateToken,async(req,res)=>{
    try{
        const claims = await claimModel.find({});
        console.log(claims)
        res.status(200).json(claims);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
})

Router.get('/:id', async (req, res) => {
    let eId = req.params.id;
    const user = await userModel.find({ eId: eId });
    res.status(200).json(user);
});

Router.delete('/:id', authenticateToken, async (req, res) => {
    let eId = req.params.id;
    const { _id } = await userModel.findOne({ "eId": eId });
    const userdel = await userModel.findByIdAndDelete(_id);
    if (!userdel) {
        res.status(500).json({ error: 'An error occurred while deleting users' });
    } else {
        res.status(200).json(userdel);
    }
});

Router.put('/:id', authenticateToken, async (req, res) => {
    let eId = req.params.id;
    const { _id } = await userModel.findOne({ "eId": eId });
    const userupdated = await userModel.findByIdAndUpdate(_id, req.body);
    if (userupdated) {
        res.status(200).json(userupdated);
    } else {
        res.status(404).send("error");
    }
});




Router.post('/signup-bulk',authenticateToken, async (req, res) => {
    const users = req.body;
  
    try {
      const savedUsers = [];
      for (const user of users) {
        const existingUser = await userModel.findOne({ eId: user.eId });
        if (existingUser) {
          return res.status(400).json({ error: `User with email ${user.email} already exists` });
        }
      }
      for(const user of users){
        const plainPassword = user.eId;
        user.password = await hashPassword(plainPassword);
        const newUser = new userModel({
          eId: user.eId,
          email: user.email,
          password: user.password,
          role: 'user',
          mobileNumber: user.mobileNumber,
          username: user.eId
        });
  
        const savedUser = await newUser.save();
        savedUsers.push(savedUser);
      }
  
      res.status(201).json(savedUsers);
    } catch (error) {
      console.error('Failed to add users:', error);
      res.status(500).json({ error: 'Failed to add users' });
    }
  });

module.exports = Router;
