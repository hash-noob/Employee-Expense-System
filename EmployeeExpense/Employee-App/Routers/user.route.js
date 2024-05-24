const userModel = require("../Models/user.model")
const loginModel = require("../Models/login.model")
const claimModel = require("../Models/claims.model")
const billsModel = require("../Models/bills.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
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
    const exists = await userModel.find({eid:req.body.eid})
    if(exists.length!==0){
        res.send("User already exists")
    }
    else{
        const plainPassword = req.body.password
        console.log(req.body);
        req.body.password=await hashPassword(plainPassword);
        user=await userModel.create(req.body)
        login = await loginModel.create({
            eid:req.body.eid,
            password:req.body.password
        })
        res.json(user)
    }
})

Router.post("/login",async(req,res)=>{

    const user = await loginModel.find({eid:req.body.eid})
    if(user.length===0){
        res.status(404).send("User doesn't exist");
    }
    else{
        const match = await bcrypt.compare(req.body.password,user[0].password)
        try{
        //If password matches generate a token and send to client
        if(match){
            const token = jwt.sign(req.body, "secretKey", { expiresIn: '1h' });

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

Router.get('/pending-bills/',authenticateToken, async (req, res) => {

    const eid = req.user.eid;
    try {
        const pendingBills = await billsModel.find({ claimedBy: eid, status: 'pending' });
        res.json(pendingBills);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving expenses' });
    }
});

Router.post('/bills/',authenticateToken,async(req,res)=>{
    const eid = req.user.eid;
    try {
        const bill = await billsModel.create({ "claimedBy": eid,...req.body});
        res.json(bill);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving expenses' });
    }
})

Router.post("/fileClaim",async (req,res)=>{
    result = await claimModel.create(req.body)
    res.send(result)
})

module.exports = Router 