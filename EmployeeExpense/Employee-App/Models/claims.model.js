const mongoose=require('mongoose')
const claimsschema=mongoose.Schema({
    eid:String,
    billsArray:[
        {billNumber:Number}
    ],
    billdescription:String,
    status:String,
    DateofFiling:Date,
    ReviewerId:String,
    Amount:Number,
    Attachment:Buffer
})
const claimsmodel=mongoose.model("claims",claimsschema)
module.exports=claimsmodel