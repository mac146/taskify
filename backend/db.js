const mongoose=require('mongoose')
const Schema=mongoose.Schema
const ObjectId=mongoose.ObjectId

const user=new Schema({
    username:String,
    password:String,
    email:String,
})

const todo=new Schema({
    title:String,
    completed:Boolean,
    userId:ObjectId,
})

const userModel=mongoose.model('users',user)
const todoModel=mongoose.model('todos',todo)

module.exports={
    userModel:userModel,
    todoModel:todoModel
}