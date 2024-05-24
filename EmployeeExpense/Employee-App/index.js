require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require("./Routers/user.route")
const managerRouter = require("./Routers/manager.route")
// eslint-disable-next-line no-unused-vars
mongoose.connect("mongodb+srv://koushik110541:mongodb123@mydatabase.gzrfjum.mongodb.net/EmployeeExpenseDB?retryWrites=true&w=majority&appName=MyDatabase").then(()=> console.log("DB connected successfully."),(err)=>{console.log(err)})
const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({ extended : true }))

app.use("/api/user",userRouter)
app.use("/api/manager",managerRouter)
app.post("/",(req,res)=>{
    res.send('Connected to node.')
})

app.listen(port,()=>{
    console.log(`The server is listening at ${port}`)
});