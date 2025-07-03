const express=require('express')
const cors = require('cors');

const app=express();

app.use(cors());

app.use(express.json());

let tasks=[]

app.get("/",(req,res)=>{
    res.json(
        tasks
    )
})

app.post("/",(req,res)=>{
   const title=req.body.title;
   const description=req.body.description;

let task={
    title:title,
    description:description,
    id:Date.now(),
    completed:false
   }

   tasks.push(task)
    
   res.json(task);

})

app.put("/:id",(req,res)=>{
    const id =req.params.id;

    for(let i=0;i<tasks.length;i++){
        if(tasks[i].id==Number(id)){
            const { title, description, completed } = req.body;

            if (title !== undefined) {
                tasks[i].title = title;
            }
            if (description !== undefined) {
                tasks[i].description = description;
            }
            if (completed !== undefined) {
                tasks[i].completed = completed;
            }

            return res.json(tasks[i])
        }
        
    }

            res.json("id not found")

})

app.delete("/:id",(req,res)=>{
    const id =req.params.id;
    for(let i=0;i<tasks.length;i++){
        if(tasks[i].id==Number(id)){
          tasks.splice(i,1);
          return res.json("task deleted")
        }
    }
     res.json("task not found")
})

app.listen(3000, () => {
  console.log("Taskify backend running on port 3000 🚀");
});
