const mongoose=require('mongoose')
const expenseschema=mongoose.Schema({
    expenseId:String,
    billNumber:{
        type:Number,
        unique:true
    },
    billImage:Buffer,
    billCost:Number,
    datedOn:Date,
    remark:String,
    claimedBy:String  //eid
})
const billsmodel=mongoose.model("BillsCollection",expenseschema)
module.exports=billsmodel
