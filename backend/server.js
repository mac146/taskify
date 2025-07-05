const express=require('express')
const jwt=require('jsonwebtoken')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app=express()
app.use(express.json())

mongoose.connect("mongodb+srv://mayankkumars584:Mayank%40146@cluster0.t1lcct0.mongodb.net/taskify-database")


const {userModel,todoModel} =require("./db");
const authmiddleware = require("./middleware/authmiddleware");
const todoRoutes = require("./routes/todo");
app.use("/todos", todoRoutes);


 const Jwt_SECRET="macc1234";


app.post("/signup",async(req,res)=>{
    const username=req.body.username
    const password=req.body.password
    const email=req.body.email
    try{
        const hashedpassword=await bcrypt.hash(password,10)
    await userModel.create({
        username,
        password: hashedpassword,
        email
    })
    res.json({
        message:"you have signed up"
    })
    console.log("new user :", username);
}catch(e){
    res.status(500).json({
        message:"signed up fail"
    })
}
})

app.post("/signin",async(req,res)=>{
    const email=req.body.email
    const password=req.body.password

     const user= await userModel.findOne({
        email:email
    })

    if(!user){
        return res.status(403).json({
            message:"invalid user"
    })
    }
    const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(403).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user._id }, Jwt_SECRET);
  res.json({ token });
  console.log("Logged in:", user.username);
});




app.get("/me",authmiddleware,async(req,res)=>{
   try{
    const user=await userModel.findById(req.id).select("-password")
    if(!user){
        return res.status(404).json({ message: "User not found" });
    }
    else{
        res.json({user})
    }
   }catch(e){
    res.status(500).json({message:"something went wrong"})
   }
   
})

 




app.listen(3000, () =>{
  console.log("Taskify backend running on port 3000 🚀");
});
