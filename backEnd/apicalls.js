const mongoose =require('mongoose')
const apicalls=mongoose.Schema({
    update:{type:Number,default:0},
    add:{type:Number,default:0}
})
module.exports=mongoose.model("calls",apicalls)