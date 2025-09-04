
document.getElementById("login-btn").addEventListener("click", function () {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "" || password === "") {
    alert("Please enter both username and password!");
  } else {
    // Redirect to home.html if both fields are filled
    window.location.href = "home.html";
  }
});
