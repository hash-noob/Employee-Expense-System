const mongoose=require('mongoose')
const managerschema=mongoose.Schema(
    {
        mid:Number,
        mname:String,
        email:String,
        password:String

    }
)
const managermodel=mongoose.model("managers",managerschema)
module.exports=managermodel