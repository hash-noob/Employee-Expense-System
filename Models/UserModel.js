const mongoose=require(`mongoose`)
const usersSchema=mongoose.Schema({
    email:String,
    password:String,
    username:String,
    mobileNumber:String,
    active:Boolean,
    role:String
})
const usermodel=mongoose.model("testjp",usersschema)
module.exports=usermodel