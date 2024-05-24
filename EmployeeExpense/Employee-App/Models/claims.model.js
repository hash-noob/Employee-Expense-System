const mongoose=require('mongoose')
const claimsschema=mongoose.Schema({
    eid:Number,
    billdescription:String,
    status:String,
    DateofFiling:Date,
    Reviewer:String,
    Amount:Number,
    Attachment:Buffer
})
const claimsmodel=mongoose.model("claims",claimsschema)
module.exports=claimsmodel