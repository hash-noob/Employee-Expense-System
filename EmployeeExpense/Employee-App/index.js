require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require("./Routers/user.route")
const adminRouter=require("./Routers/admin.route")
const managerRouter=require("./Routers/manager.route")
const userModel = require("./Models/user.model")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const multer=require("multer");



mongoose.connect("mongodb+srv://koushik110541:mongodb123@mydatabase.gzrfjum.mongodb.net/EmployeeExpenseDB?retryWrites=true&w=majority&appName=MyDatabase"
).then(()=> console.log("DB connected successfully."),(err)=>{console.log(err)})
const app = express();
const port = process.env.PORT;

//app.use(express.json())
app.use(express.urlencoded({ extended : true }))

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.use(express.json({ limit: '10mb' }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));



// app.use(express.static(path.join(__dirname, 'build')));

// // Handle all other routes by serving the index.html file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });  
                


  
app.use("/api/user",userRouter)
app.use("/api/admin",adminRouter)
app.use("/api/manager",managerRouter)
app.post("/",(req,res)=>{
    
})


app.listen(port,()=>{
    console.log(`The server is listening at ${port}`)
});

async function hashPassword(plainPassword) {
    console.log("called")
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

app.get("/resetPassword/:token",async (req,res)=>{
    const token = req.params.token
    jwt.verify(token, "secretKey",async (err, user) => {
        console.log(user)
        if (err) return res.sendFile('C:\\Users\\91891\\OneDrive\\Documents\\Employee-Management-System\\EmployeeExpense\\Employee-App\\templates\\PasswordFailed.html');
        const pass = await hashPassword(user.eId)
        const status = await userModel.findOneAndUpdate({eId:user.eId},{password:pass})
        if (status)
            res.sendFile('C:\\Users\\91891\\OneDrive\\Documents\\Employee-Management-System\\EmployeeExpense\\Employee-App\\templates\\PasswordChangeSucces.html')
      });
})