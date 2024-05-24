const userModel = require("../Models/user.model")
const loginModel = require("../Models/login.model")
const expenseModel = require("../Models/expense.model")
const bcrypt = require("bcryptjs")
const express = require("express")
const jwt = require("jsonwebtoken")
const Router = express.Router() 

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, "secret key", (err, user) => {
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
      // Store the hash in your database
    } catch (err) {
      console.log(err);
    }
}


Router.post("/signup",async(req,res)=>{
    const exists = await userModel.find({email:req.body.email})
    console.log(exists)
    if(exists.length!==0){
        res.send("User already exists")
    }
    else{
        const plainPassword = req.body.password
        req.body.password=await hashPassword(plainPassword);
        user=await userModel.create(req.body)
        login = await loginModel.create({
            email:req.body.email,
            password:req.body.password
        })
        res.json(user)
    }
})

Router.post("/login",async(req,res)=>{
   
    const user = await loginModel.find({email:req.body.email})
    if(user.length===0){
        res.status(404).send("User doesn't exist");
    }
    else{
        const match = await bcrypt.compare(req.body.password,user[0].password)
        if(match){
            //res.send("Login success");
            const payload={
                ...req.body,
                
            }
            jwt.sign(payload,"secret key",(err,token)=>{
                res.status(200).json({token})
            })
        }
        else{
            res.status(401).send("Invalid cred");
        }
    }
})

Router.get('/expenses', authenticateToken, async (req, res) => {
    try {
      const username = req.user.email; // Extracted from the verified token
  
      const expenseArray = await expenseModel.find({ 'claimedBy': username });
  
      if (expenseArray.length === 0) {
        return res.status(404).send({ message: 'No expenses found for the specified username' });
      }
  
      res.status(200).send(expenseArray);
    } catch (error) {
      console.error(`Error fetching expenses for username ${username}:`, error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });


Router.post('/expense', authenticateToken, async (req, res) => {
    try {
      const email = req.user.email; // Extracted from the verified token
      const expenseData = req.body;
  
      // Associate the expense with the authenticated user
      expenseData.claimedBy =  email ;
  
      const expense = await expenseModel.create(expenseData);
  
      res.status(201).send(expense);
    } catch (error) {
      console.error('Error creating expense:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });

module.exports = Router 