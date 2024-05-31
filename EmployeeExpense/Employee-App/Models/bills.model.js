const mongoose=require('mongoose')
const expenseschema=mongoose.Schema({
    eId: String,
    billId:{
        type : String,
        unique : true
    },
    billAmount:Number,
    billImage:Buffer,
    category:String,
    merchant:String, 
    remark:String, 
    datedOn:Date,
    paymentMethod:String
})
const billsmodel=mongoose.model("BillsCollection",expenseschema)
module.exports=billsmodel
