let userData=JSON.parse(localStorage.getItem("userDatabase"))
    let mail;
    let password;
    let message = document.getElementById("shortmsg")
    let formData= document.querySelector("form")
    var flag = 0;
    formData.addEventListener("submit",function(e){
        e.preventDefault();
        mail=document.getElementById("email").value;
        password= document.getElementById("password").value;
        
        userData.map(function(ele){
            if(mail==ele.email && password==ele.password){
                flag=1;

                // check() 
            }else if(mail == "admin@gmail.com" && password == "admin"){
                flag = 2;    
            }
            })
            console.log(flag)
        confirm(flag);
   })
    function confirm(flag){
        if(flag == 1) {
            message.innerHTML="Log in Successful"
            setTimeout(()=>window.location.href="/index.html",1000)
        }else if(flag == 2){
            window.location.href = "/admin.html"
        }else{
            alert("wrong credentials")
        }
    }




  
