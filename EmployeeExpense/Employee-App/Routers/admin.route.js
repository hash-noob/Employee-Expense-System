const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../Models/user.model');
const claimModel = require('../Models/claims.model');
const sendMail = require('../mailer'); // Import the mailer
const { Edit } = require('@mui/icons-material');
const Router = express.Router();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log('Token received: ', token); // Log the token received
    if (!token) return res.sendStatus(401);
    jwt.verify(token, 'secretKey', (err, user) => {
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

Router.post('/addUser', authenticateToken, async (req, res) => {
    try {
        const exists = await userModel.find({ eId: req.body.eId });
        if (exists.length !== 0) {
            return res.status(400).send('User already exists');
        }

        const plainPassword = req.body.password;
        req.body.password = await hashPassword(plainPassword);
        const user = await userModel.create(req.body);

        // Send email to user
        try {
            await sendMail(
                user.email,
                'Welcome to EmployeeExpenseApp',
                'You have been added to EmployeeExpenseApp. Please log in and change your password.'
            );
            console.log("Mail sent successfully");
        } catch (emailError) {
            console.error('Failed to send email:', emailError);
            return res.status(500).send('User added, but failed to send email');
        }

        res.status(201).json(user);
    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).send('Error adding user');
    }
});




Router.get('/stats', async (req, res) => {
    try {
        const userCount = await userModel.countDocuments({});
        console.log(`User count: ${userCount}`);
        const managerCount = await userModel.countDocuments({ role: 'manager' });

        console.log(userCount);
        res.status(200).json({ userCount, managerCount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

Router.put('/claims/:cId', authenticateToken, async (req, res) => {
    const { cId } = req.params;
    const { status } = req.body;
  
    try {
        console.log("inside")
      const updatedClaim = await claimModel.findOneAndUpdate({cId:cId}, { status }, { new: true });
  
      if (!updatedClaim) {
        return res.status(404).json({ error: 'Claim not found' });
      }
  
      res.status(200).json(updatedClaim);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

Router.get('/claims/manager/:eId', authenticateToken, async (req, res) => {
    console.log("hello")
    try {
        const {eId} = req.params;
        const claims = await claimModel.find({mId:eId});
        console.log("claims",claims);
        res.status(200).json(claims);
    } catch (err) {
        res.status(500).json({ error: "error occurred while getting the claim" });
    }
});

Router.get('/claims/user/:eId', authenticateToken, async (req, res) => {
    console.log("hello")
    try {
        const {eId} = req.params;
        const claims = await claimModel.find({eId:eId});
        console.log("claims",claims);
        res.status(200).json(claims);
    } catch (err) {
        res.status(500).json({ error: "error occurred while getting the claim" });
    }
});

Router.get('/claims', authenticateToken, async (req, res) => {
    try {
        console.log("hi")
        const claims = await claimModel.find({});
        console.log(claims);
        res.status(200).json(claims);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



Router.get('/:id', async (req, res) => {
    let eId = req.params.id;
    const user = await userModel.find({ eId: eId });
    res.status(200).json(user);
});

Router.delete('/:id', authenticateToken, async (req, res) => {
    let eId = req.params.id;
    try{
        const userdel = await userModel.findOneAndDelete({eId:eId});
        if (!userdel) {
        res.status(500).json({ error: 'An error occurred while deleting users' });
        } else {
        res.status(200).json(userdel);
        }
        try {
            if(userdel.role==='manager'){
                 await sendMail(
                    userdel.email,
                    'Manager Deletion Notification',
                    `Dear Company Manager,\n\nThis is to inform you that the manager with ID ${eId} has been deleted from the system.\n\nBest Regards,\nYour Company`
                );
            }
            else if(userdel.role==='user'){
                await sendMail(
                    userdel.email,
                    'Employee Deletion Notification',
                    `Dear Company Employee,\n\nThis is to inform you that the Employee with ID ${eId} has been deleted from the system.\n\nBest Regards,\nYour Company`
                );
            }
            console.log("Mail sent successfully");
        } catch (emailError) {
            console.error('Failed to send email:', emailError);
            return res.status(500).send('User added, but failed to send email');
        }
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
});

Router.put('/:eId', authenticateToken, async (req, res) => {
    try{
        let eId = req.params.eId;
        const userUpdated = await userModel.findOneAndUpdate({eId:eId}, req.body);
        if (userUpdated) {
            res.status(200).json(userUpdated);
        } else {
            res.status(404).send('error');
        }
        try {
            if(userUpdated.role==='manager'){
                 await sendMail(
                    userUpdated.email,
                    'Manager Profile Updation Notification',
                    `Dear Company Manager,\n\nThis is to inform you that the manager with ID ${eId}'s profile has been updated in the system.\n\nBest Regards,\nYour Company`
                );
            }
            else if(userUpdated.role==='user'){
                await sendMail(
                    userUpdated.email,
                    'Employee Profile Updation Notification',
                    `Dear Company Employee,\n\nThis is to inform you that the Employee with ID ${eId}'s profile has been updated in the system.\n\nBest Regards,\nYour Company`
                );
            }
            console.log("Mail sent successfully");
        } catch (emailError) {
            console.error('Failed to send email:', emailError);
            return res.status(500).send('User added, but failed to send email');
        }
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
});

Router.post('/signup-bulk', authenticateToken, async (req, res) => {
    const users = req.body;

    try {
        const savedUsers = [];
        for (const user of users) {
            const existingUser = await userModel.findOne({ eId: user.eId });
            if (existingUser) {
                return res.status(400).json({ error: `User with email ${user.email} already exists` });
            }
        }
        for (const user of users) {
            const plainPassword = user.eId;
            user.password = await hashPassword(plainPassword);
            const newUser = new userModel({
                eId: user.eId,
                email: user.email,
                password: user.password,
                role: 'user',
                mobileNumber: user.mobileNumber,
                username: user.eId,
            });

            const savedUser = await newUser.save();
            savedUsers.push(savedUser);

            // Send email to user
            await sendMail(
                user.email,
                'Welcome to EmployeeExpenseApp',
                'You have been added to EmployeeExpenseApp. Please log in and change your password.'
            );
        }

        res.status(201).json(savedUsers);
    } catch (error) {
        console.error('Failed to add users:', error);
        res.status(500).json({ error: 'Failed to add users' });
    }
});

Router.get('/', authenticateToken, async (req, res) => {
    const users = await userModel.find({});
    res.status(200).json(users);
});

  

module.exports = Router;
