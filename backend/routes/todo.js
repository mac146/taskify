const express = require('express');
const router = express.Router();
const { todoModel } = require("../db");
const authmiddleware = require("../middleware/authmiddleware");



 router.post("/",authmiddleware,async(req,res)=>{
   
    const userid=req.userId;
    const title=req.body.title;
    const description=req.body.description;
    const completed=req.body.completed;
try{
    const todo=await todoModel.create({
        userId:userid,
        title,
        description,
        completed
    })
    res.json({
        todo,
    })

} catch(e){
    res.json({message:"something  went wrong"})
}
})

router.get("/",authmiddleware,async(req,res)=>{
    const userId=req.userId;
    const todos=await todoModel.find({
         userId
    })

    if(todos){
        res.json({todos})
    }
    else{
        res.json({
            message:"no todos found"
        })
    }
})

router.put("/:id",authmiddleware,async(req,res)=>{
   
  const todoId = req.params.id;
  const userId = req.userId;
  const { title, description, completed } = req.body;

  try {
    const updatedTodo = await todoModel.findOneAndUpdate(
      { _id: todoId, userId }, // Only allow updating if todo belongs to the user
      { title, description, completed },
      { new: true } // Return the updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found or not authorized" });
    }

    res.json({ todo: updatedTodo });
  } catch (e) {
    res.status(500).json({ message: "Failed to update todo" });
  }
});

router.delete("/:id",authmiddleware,async(req,res)=>{
    const todoId = req.params.id;
    const userId = req.userId;
    try{
    const deletetodo= await todoModel.findOneAndDelete({ _id: todoId, userId })
    if(!deletetodo){
        res.json({message:"todo not found"})
    }
    else{
        res.json({message:"deleted succesfully"})
    }
}catch(e){
    res.status(500).json({message:"failed to delete todo"})
}
})

module.exports = router;
