

let checkOut = document.querySelector(".btn");
let digits='1234567890'

let otp=''

genOtp()
function genOtp() {
  otp=''
  for (let i = 0; i < 4; i++) {
    otp+=digits[Math.floor(Math.random()*10)]
  }
  console.log(otp)
}

checkOut.addEventListener("click", (e) => {
  e.preventDefault()
  check = prompt(`Enter Otp.  ${otp}`)
  if(check==otp){
    alert("Thankyou for shopping.")
    genOtp()
  }else{
    alert("Otp incorrect")
    genOtp()
  }
  console.log(check)
})
