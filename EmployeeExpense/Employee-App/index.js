require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require("./Routers/user.route")
const adminRouter=require("./Routers/admin.route")
const managerRouter=require("./Routers/manager.route")
const multer=require("multer");
const billsmodel = require('./Models/bills.model');


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


  
app.use("/api/user",userRouter)
app.use("/api/admin",adminRouter)
app.use("/api/manager",managerRouter)
app.post("/",(req,res)=>{
    
})


app.listen(port,()=>{
    console.log(`The server is listening at ${port}`)
});

app.post('/imgUpload',upload.single('image'),async (req,res)=>{
    const {billId} =req.body
    console.log(req.body)
    try{const img = await billsmodel.find({billId})
    img.billImage = req.file.buffer;
    img.billImage.contentType = req.file.mimetype
    await newImage.save((err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send('Image uploaded successfully!');
      });}catch(err){
        console.log(err)
      }
})

app.get('/image/:id',async (req, res) => {
    const billId = req.params.id
 
    try{
     const  image = await billsmodel.find({billId}).billImage
      if (!image) return res.status(404).send('Image not found');
      res.contentType(image.billImage.contentType);
      res.send(image.billImage.data);
    }catch(err){
        console.log(err)
    }
  });