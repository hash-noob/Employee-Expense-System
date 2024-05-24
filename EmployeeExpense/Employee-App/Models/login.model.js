const mongoose= require("mongoose")
const loginSchema = mongoose.Schema({
    eid:String,
    password:String
})

const loginModel = mongoose.model("login",loginSchema)

module.exports= loginModel