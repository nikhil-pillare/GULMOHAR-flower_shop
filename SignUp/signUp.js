let container = document.getElementById("container")
let formData= document.querySelector("form")

let userData=JSON.parse(localStorage.getItem("userDatabase")) ||[];
formData.addEventListener("submit", function(e){
    e.preventDefault();
let mail = document.getElementById("email").value
let name = document.getElementById("fname").value + " " +document.getElementById("lname").value;
let password =document.getElementById("password").value;

let userCrd={
                name : name,
                email: mail,
                password: password
            }
    userData.push(userCrd)

localStorage.setItem("userDatabase",JSON.stringify(userData))
})


// let n= document.getElementById("google");
// n.addEventListener("click",go);

// async function go(){
//     window.location.href="http://localhost:2233/auth/google"
// }