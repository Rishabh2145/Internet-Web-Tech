var back = document.getElementById("back");
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
register.onclick = () => {
    let temp = confirm('Are you sure you want to submit?');
    if (temp == true){
        alert("Registration is successful. You can now login through your Account ID and Password.");
        back_login();
    }
}