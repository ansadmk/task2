const mongoose =require('mongoose')
const model=mongoose.Schema({
    data:String
})
module.exports=mongoose.model("tasks",model)