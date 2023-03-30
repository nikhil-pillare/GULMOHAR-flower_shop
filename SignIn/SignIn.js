let userData=JSON.parse(localStorage.getItem("userDatabase"))
    let mail;
    let password;
    let message = document.getElementById("success")
    let formData= document.querySelector("form")
    var flag = false;
    formData.addEventListener("submit",function(e){
        e.preventDefault();
        mail=document.getElementById("email").value;
        password= document.getElementById("password").value;
        
        userData.map(function(ele){
            if(mail==ele.email && password==ele.password){
                flag=true;
                // check() 
            }
            
            })
            console.log(flag)
        confirm(flag);
   })
    function confirm(flag){
        if(flag == true) {
            message.innerHTML="Log in Successful"
            setTimeout(()=>window.location.href="/index.html",1000)
        }else{
            alert("wrong credentials")
        }
    }




  
