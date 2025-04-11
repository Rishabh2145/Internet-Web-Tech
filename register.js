// JavaScript code for the registration form validation and submission
document.getElementById("submit").addEventListener("click", () => {
  alert("Account Created Successfully!");
  window.location.href = "index.html";
});
document.getElementById("reset").onclick = () => { return confirm("Are you sure you want to reset the form?"); }

setInterval(() => {
  const date = new Date();
  document.getElementById("time").innerHTML = date.toLocaleDateString() + " | " + date.toLocaleTimeString() + " | IST";
}, 1000);

var id = document.getElementById("acc_id");
var eid = document.getElementById("errorid");
var fname = document.getElementById("first_name");
var mname = document.getElementById("middle_name");
var lname = document.getElementById("last_name");
var ename = document.getElementById("errorname");
var emname = document.getElementById("errormname");
var elname = document.getElementById("errorlname");
var email = document.getElementById("email");
var eemail = document.getElementById("erroremail");
var pass = document.getElementById("pass");
var epass = document.getElementById("errorpass");
var conf_pass = document.getElementById("conf_pass");
var econf_pass = document.getElementById("errorconf");
var phone1 = document.getElementById("phone1");
var phone2 = document.getElementById("phone2");
var ephone = document.getElementById("errorphone");
var ephone2 = document.getElementById("ephone2");

function validityForm() {

  function emailValid(email) {
    const emailRegx = /^[A-Za-z0-9._%-+]+@[A-Za-z0-9-+]+\.[A-Za-z.]{2,}$/;
    if (emailRegx.test(email) == true || email == "") {
      eemail.innerHTML = "";
    }
    else {
      eemail.innerText = "Please enter a valid email address.";
      eemail.style.color = "red";
      eemail.style.fontSize = "small";
    }
  }
  function phoneValid(phone1, error) {
    const phoneRegx = /^\d{10}$/;
    if (phoneRegx.test(phone1) == true || phone1 == "") {
      error.innerHTML = "";
    }
    else {
      error.innerText = "Please enter a valid phone number.";
      error.style.color = "red";
      error.style.fontSize = "small";
    }
  }

  function idValid(id) {
    idRegx = /^[A-Z]{2}[0-9]{4}[A-Z]{2}$/;
    if (idRegx.test(id) == true || id == "") {
      eid.innerHTML = "";
    }
    else {
      eid.innerText = "Please enter a valid account ID.";
      eid.style.color = "red";
      eid.style.fontSize = "small";
    }
  }
  function nameValid(name, error) {
    const nameRegx = /^[A-Z]{1}[a-z]+$/;
    if (nameRegx.test(name) == true || name == "") {
      error.innerHTML = "";
    }
    else {
      error.innerText = "Please enter a valid name.";
      error.style.color = "red";
      error.style.fontSize = "small";
    }

  }

  function passwordValid(pass) {
    const passRegx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;
    ;
    if (passRegx.test(pass) == true || pass == "") {
      epass.innerHTML = "";
    }
    else {
      epass.innerText = "Please enter a valid password.";
      epass.style.color = "red";
      epass.style.fontSize = "small";
    }
  }
  email.onkeyup = emailValid(email.value);
  phone1.onkeyup = phoneValid(phone1.value, ephone);
  phone2.onkeyup = phoneValid(phone2.value, ephone2);
  id.onkeyup = idValid(id.value);
  fname.onkeyup = nameValid(fname.value, ename);
  mname.onkeyup = nameValid(mname.value, emname);
  lname.onkeyup = nameValid(lname.value, elname);
  pass.onkeyup = passwordValid(pass.value);
  conf_pass.onkeyup = function () {
    if (conf_pass.value != pass.value) {
      econf_pass.innerText = "Password does not match.";
      econf_pass.style.color = "red";
      econf_pass.style.fontSize = "small";
    }
    else {
      econf_pass.innerHTML = "";
    }
  }

}

setInterval(validityForm, 10);