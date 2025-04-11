var back = document.getElementById("back");
var top = document.getElementById("top");
var down = document.getElementById("down");
var newAcc = document.getElementById("newAcc");
var cred = document.getElementById("cred");
var reg = document.getElementById("reg");
var register = document.getElementById("insert");


back.onclick = window.location.href = "index.html";
reg.onclick = window.location.href = "register.html";

function validityForm() {
  var id = document.getElementById("acc_id");
  var eid = document.getElementById("errorid");
  var fname = document.getElementById("first_name");
  var mname = document.getElementById("middle_name");
  var lname = document.getElementById("last_name");
  var ename = document.getElementById("errorname");
  var email = document.getElementById("email");
  var eemail = document.getElementById("erroremail");
  var pass = document.getElementById("pass");
  var epass = document.getElementById("errorpass");
  var conf_pass = document.getElementById("conf_pass");
  var econf_pass = document.getElementById("errorcof");
  var phone1 = document.getElementById("phone1");
  var phone2 = document.getElementById("phone2");
  var ephone = document.getElementById("errorphone");

  function emailValid(email)
  {
    const emailRegx = /^[A-Za-z0-9._%-+]+@[A-Za-z0-9-+]+\.[A-Za-z.]{2,}$/;
    if (emailRegx.test(email) == true) {
      eemail.innerHTML = "";
    }
    else {
      eemail.innerText = "Please enter a valid email address.";
      eemail.style.color = "red";
      eemail.style.fontSize = "small";
    }
  }

  email.onkeyup = emailValid(email.value);
  // alert(email.value);/
}
// validityForm();
setInterval(validityForm,10);