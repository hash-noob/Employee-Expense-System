// const mongoose=require('mongoose')
// const expenseschema=mongoose.Schema({
//     eId: String,
//     billId:{
//         type : String,
//         unique : true
//     }, 
//     billAmount:Number,
//     billImage:Buffer,
//     category:String,
//     merchant:String, 
//     remark:String, 
//     datedOn:Date,
//     status:String,
//     paymentMethod:String
// })
// const billsmodel=mongoose.model("BillsCollection",expenseschema)
// module.exports=billsmodel

const mongoose = require('mongoose');

const expenseschema = mongoose.Schema({
    eId: String,
    billId: {
        type: String,
        unique: true
    },
    billAmount: Number,
    billImage: String, // Change this to String
    category: String,
    merchant: String,
    remark: String,
    datedOn: Date,
    status: String,
    paymentMethod: String
});

const billsmodel = mongoose.model("BillsCollection", expenseschema);
module.exports = billsmodel;
