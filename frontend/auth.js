async function signup() {
  const username = document.getElementById("a").value;
  const email = document.getElementById("e").value;
  const password = document.getElementById("b").value;

  await axios.post("http://localhost:3000/signup", {
    username,
    email,
    password
  });

  alert("You are signed up!");
}

async function signin() {
  const email = document.getElementById("c").value;
  const password = document.getElementById("d").value;

  const response = await axios.post("http://localhost:3000/signin", {
    email,
    password
  });

  localStorage.setItem("token", response.data.token);
  alert("You are signed in!");
  window.location.href = "index.html";
}

function logout() {
  localStorage.removeItem("token");
  alert("You are logged out!");
  window.location.href = "auth.html";
}
