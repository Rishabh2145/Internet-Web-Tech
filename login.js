var back = document.getElementById("back");
var top = document.getElementById("top");
var down = document.getElementById("down");
var newAcc = document.getElementById("newAcc");
var cred = document.getElementById("cred");
var reg = document.getElementById("reg");
var register = document.getElementById("insert");


function back_login()
{
    newAcc.style.display = "none";
    cred.style.display = "flex";
}
back.onclick = back_login;
reg.onclick = () => {
    newAcc.style.display = "flex";
    cred.style.display = "none";
}

register.addEventListener("click", function (event) {
    event.preventDefault(); 

    let form = document.getElementById("registerForm");

    if (form.checkValidity()) {
      if (confirm("Are you sure you want to submit?")) {
        alert("Registration is successful. You can now login through your Account ID and Password.");
        back_login();
      }
    } else {
      form.reportValidity();
    }
  });