const userModel = require("../Models/user.model")
const claimModel = require("../Models/claims.model")
const billsModel = require("../Models/bills.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const express = require("express")
const claimsmodel = require("../Models/claims.model")
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
    const exists = await userModel.find({eId:req.body.eId})
    if(exists.length!==0){
        res.status(404).send("User already exists")
    }
    else{
        const plainPassword = req.body.password
       
        req.body.password=await hashPassword(plainPassword);
        user=await userModel.create(req.body)
        res.status(200).json(user)
    }
})

Router.post("/login",async(req,res)=>{

    const user = await userModel.find({eId:req.body.eId})
    if(user.length===0){
        res.status(404).send("User doesn't exist");
    }
    else{
        const match = await bcrypt.compare(req.body.password,user[0].password)
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


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.sendStatus(401);
   
    jwt.verify(token, "secretKey", (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user.eId;
      req.password = user.password
      next();
    });
  }

Router.get('/pending-bills',authenticateToken, async (req, res) => {

    const eId = req.user;
    try {
        const pendingBills = await billsModel.find({ eId : eId, status: 'pending' });
        res.json(pendingBills);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving expenses' });
    }
});

Router.delete('/bill',authenticateToken,async(req,res)=>{
    const {billId}=req.query;
    try{
        const deletedClaim = await billsModel.deleteOne({billId})
        if(deletedClaim){
            res.status(200).json({"message":"claim is deleted"})
        }
    }catch(err){
        console.log(err)
        res.status(404).send("error")
    }
})

Router.get('/bills',authenticateToken,async(req,res)=>{
    const eId = req.user;
    try {
        const bills = await billsModel.find({ eId : eId});
        res.json(bills);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving expenses' });
    }
})

Router.get('/claims',authenticateToken,async(req,res)=>{
    const eId = req.user
    try {
        const claims = await claimModel.find({"eId": eId , status:"pending"});
        res.json(claims);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving expenses' });
    }
})

Router.get('/claimsHistory',authenticateToken,async(req,res)=>{
    const eId = req.user
    try {
        const claims = await claimModel.find({"eId": eId });
        res.json(claims);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving expenses' });
    }
})

Router.put('/claims',async(req,res)=>{
    const {cId}=req.body;
    const {_id} = await claimModel.findOne({"cId":cId})
    const updatedClaim = await claimModel.findByIdAndUpdate(_id,req.body)
    if(updatedClaim){
        res.status(200).json(updatedClaim)
    }
    else{
        res.status(404).send("error")
    }
})
Router.delete('/claims',async(req,res)=>{
    const {cId}=req.body;
    const {_id} = await claimModel.findOne({"cId":cId})
    const deletedClaim = await claimModel.findByIdAndDelete(_id)
    if(deletedClaim){
        res.status(200).json({"message":"claim is deleted"})
    }
    else{
        res.status(404).send("error")
    }

})

Router.get('/managers',async (req,res)=>{
    const managers = await userModel.find({ role: 'manager'});
    res.send(managers)
})

Router.post('/bills',async(req,res)=>{
    console.log(req.body)
    try {
        const bill = await billsModel.create(req.body);
        res.status(200).json(bill);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving expenses' });
    }
})

Router.post("/fileClaim",async (req,res)=>{
    result = await claimModel.create(req.body)
    res.send(result)
})


Router.put('/claims/withdraw',async(req,res)=>{
    
    const {cId}=req.body;
    const updatedClaim = await claimModel.findOneAndUpdate({"cId" : cId},{"status":"withdraw"})
    if(updatedClaim){
        res.status(200).json(updatedClaim)
    }
    else{
        res.status(404).send("error")
    }
})

Router.post('/ChangePassword',authenticateToken,async (req,res)=>{
    const {currentPassword,newPassword} = req.body;
    const eId = req.user
    
    try{
        if(req.password!== currentPassword){
            res.status(201).json({msg :'You have entered the wrong password'})
        }else{
            hashedpass = await hashPassword(newPassword);
            const user = await userModel.findOneAndUpdate({"eId": eId},{"password": hashedpass });
            if(user){
                const token = jwt.sign({eId,"password": newPassword },"secretKey")
                res.status(200).json({ msg :"Password changed Successfully",token})
            }
        }
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Opps..Something went wrong"})
    }
})

Router.post('/ChangeNumber',authenticateToken,async (req,res)=>{
    const {password,newNumber} = req.body
    const eId = req.user
    const currpass = req.password

    try{
        if(password === currpass){
            const user = await userModel.findOneAndUpdate({eId},{"mobileNumber":newNumber})
            if(user)
                res.status(200).send("Succesfully changed!!") 
        }else{
            res.status(201).send("Wrong password")
        }
    }catch(err){
        console.log(err)
    }
})


module.exports = Router 