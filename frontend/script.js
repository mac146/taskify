async function addtask() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const token = localStorage.getItem("token");

    const response = await axios.post("http://localhost:3000/todos", {
        title: title,
        description: description,
        completed: false
    }, {
        headers: {
            token: token
        }
    });

    const li = document.createElement("li");
    li.innerHTML = response.data.todo.title + " - " + response.data.todo.description;

    const button = document.createElement("button");
    button.innerHTML = "delete";
    button.onclick = async function () {
        const id = response.data.todo._id;
        await axios.delete("http://localhost:3000/todos/" + id, {
            headers: {
                token: token
            }
        });
        li.remove();
    };

    const edit = document.createElement("button");
    edit.innerHTML = "edit";
    edit.onclick = async function () {
        const id = response.data.todo._id;
        const newtitle = prompt("Enter your new title:");
        const newdesc = prompt("Enter your new description:");
        const updated = await axios.put("http://localhost:3000/todos/" + id, {
            title: newtitle,
            description: newdesc
        }, {
            headers: {
                token: token
            }
        });
        li.innerHTML = updated.data.todo.title + " - " + updated.data.todo.description;
        li.appendChild(edit);
        li.appendChild(button);
    };

    li.appendChild(edit);
    li.appendChild(button);

    document.getElementById("task-list").appendChild(li);
}
