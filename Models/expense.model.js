const mongoose=require('mongoose')
const expenseschema=mongoose.Schema({
    expenseId:String,
    billNumber:Int16Array,
    billImage:Blob,
    billCost:Int16Array,
    datedOn:Date,
    status:String,
    remark:String,
    claimedBy:{
        email:String,
        password:String,
        username:String,
        mobileNumber:String,
        active:Boolean,
        role:String
    }
})
const expensemodel=mongoose.model("ExpenseCollection").expenseschema
module.exports=expensemodel