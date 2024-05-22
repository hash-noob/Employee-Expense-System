const mongoose= require("mongoose")
const userSchema = mongoose.Schema({
    email:String,
    password:String,
    username:String,
    mobileNumber:String,
    active:Boolean,
    role:String
})

const studentModel = mongoose.model("user",userSchema)