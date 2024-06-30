const mongoose=require('mongoose')
const claimsschema=mongoose.Schema({
    eId : String,
    cId:String,
    status:String,
    billsArray:[
        {billId:String}
    ],
    datedOn : Date,
    endedOn : Date,
    title:String,
    mId: String, //Id of manager
    comments : String,
    fromDate:Date,
    toDate:Date
})
const claimsmodel=mongoose.model("claims",claimsschema)
module.exports=claimsmodel