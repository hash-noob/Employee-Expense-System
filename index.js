require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');


const db = mongoose.connect("mongodb+srv://koushik110541:mongodb123@mydatabase.gzrfjum.mongodb.net/?retryWrites=true&w=majority&appName=MyDatabase").then(()=> console.log("DB connected successfully."),(err)=>{console.log(err)})
const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({ extended : true }))


// app.get('/',async (req,res)=>{
//     let result = await student.create(req.body);
//     res.json(result);
// })

app.listen(port,()=>{
    console.log(`The server is listening at ${port}`)
});