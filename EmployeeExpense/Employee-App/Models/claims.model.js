const mongoose=require('mongoose')
const claimsschema=mongoose.Schema({
    eId : String,
    cId:String,
    status:String,
    billsArray:[String],
    datedOn : Date,
    endedOn : Date,
    title:String,
    mId: String, //Id of manager
    comments : String,
    totalAmount:Number,
    fromDate:Date,
    toDate:Date
}, { timestamps: true })
const claimsmodel=mongoose.model("claims",claimsschema)
module.exports=claimsmodel