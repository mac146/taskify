async function addtask(){
    const title=document.getElementById("a").value
    const token = localStorage.getItem("token");
    const response=await axios.post("http://localhost:3000/",
       {
        title:title,
        description: title,
        completed:false
       },{
    headers: {                                   // 🔸 Line 2: send token in headers
        token: token                             // 🔸 Line 3: actual token key-value
    }
});
    
    const li=document.createElement("li")
    li.innerHTML=response.data.title

    const button=document.createElement("button")
    button.innerHTML="delete"
    button.onclick= async function(){
        const id=response.data.id;
        await axios.delete("http://localhost:3000/"+id)
       li.remove();
    }

    const edit=document.createElement("button")
    edit.innerHTML="edit"
    edit.onclick=async function(){
        const id=response.data.id
        const newtitle=prompt("enter your new title : ")
        await axios.put("http://localhost:3000/"+id,{
            title:newtitle
        })
        li.innerHTML=newtitle;
         li.appendChild(edit);
   li.appendChild(button);
    }
    li.appendChild(edit);
   li.appendChild(button);

    document.getElementById("taskList").appendChild(li);

}