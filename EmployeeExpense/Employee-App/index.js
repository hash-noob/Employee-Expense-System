require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require("./Routers/user.route")
const adminRouter=require("./Routers/admin.route")
const managerRouter=require("./Routers/manager.route")


mongoose.connect("mongodb+srv://koushik110541:mongodb123@mydatabase.gzrfjum.mongodb.net/EmployeeExpenseDB?retryWrites=true&w=majority&appName=MyDatabase",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log("DB connected successfully."),(err)=>{console.log(err)})
const app = express();
const port = process.env.PORT;

//app.use(express.json())
app.use(express.urlencoded({ extended : true }))



app.use(express.json({ limit: '10mb' }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));


  
app.use("/api/user",userRouter)
app.use("/api/admin",adminRouter)
app.use("/api/manager",managerRouter)
app.post("/",(req,res)=>{
    
})

app.listen(port,()=>{
    console.log(`The server is listening at ${port}`)
});