const mongoose=require('mongoose')
const claimsschema=mongoose.Schema({
    claimId : String, 
    eid : String,
    billsArray:[
        {type : String}
    ],
    billdescription:String,
    status:String,
    DateofFiling:Date,
    ReviewerId:String,
    reviewerRemark : String,
    Amount:Number,
    Attachment:Buffer
})
const claimsmodel=mongoose.model("claims",claimsschema)
module.exports=claimsmodel