const mongoose=require('mongoose')
const expenseschema=mongoose.Schema({
    expenseId:{
        type : String,
        unique : true
    },
    billNumber:Number,
    billImage:Buffer,
    billCost:Number,
    datedOn:Date,
    status:String,
    remark:String,
    claimedBy:String  //eid
})
const billsmodel=mongoose.model("BillsCollection",expenseschema)
module.exports=billsmodel
