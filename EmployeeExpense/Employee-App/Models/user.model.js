const mongoose= require("mongoose")
const userSchema = mongoose.Schema({
    eId:{
        type : String,
        unique : true
    },
    email:String,
    password:String,
    role:String,
    mobileNumber:String
})

const userModel = mongoose.model("user",userSchema)

module.exports= userModel