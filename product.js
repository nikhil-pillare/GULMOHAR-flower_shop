let Kdisplay=document.getElementById('Kdisplay')
let postsUrl='https://bored-school-uniform-bull.cyclic.app/flowers'
let Kdata;
let body=document.getElementsByTagName('body')
let cart=JSON.parse(localStorage.getItem('cart'))||[]


fetchdata()
async function fetchdata() {
let res= await fetch(`${postsUrl}`)
let data=await res.json()
Kdata=data
console.log(Kdata)
let newdata=Kformatdata(data)
// console.log(newdata)
Kshowdata(newdata[0])
Kdisplaybutton(newdata)
}

// input data search
let Kinputdata=document.getElementById('inputsearch')
Kinputdata.addEventListener('input',()=>{ 
    lastchecked.checked=false
    // let p;
    clearTimeout(p)
    var p=setTimeout(() => {
        Kmakefilter(Kinputdata.value)
    }, 2000); 
})
function Kmakefilter(data) {
     let Kfiltered=Kdata.filter((e)=>{
        if(e.category==data||e.title.includes(data)){return true}
        return false
     })
     let newdata=Kformatdata(Kfiltered)
    Kshowdata(newdata[0])
    Kdisplaybutton(newdata)
}

function Kformatdata(data){
    let count=0
    let temp=[[]]
    let Tdata=data.reduce((acc,item)=>{
    acc=temp
    if(count==12){
        count=0
        acc.push([])
        acc[acc.length-1].push(item)
        count++
    }else{
        acc[acc.length-1].push(item)
        count++
    }
    temp=acc
    return acc
    },[])
     return Tdata
}


// display function to show cards
function Kshowdata(data) {

    Kdisplay.innerHTML=''
    data.forEach((element) => {
        let karan=''
        for(let i=0;i<+element.rating;i++){
            karan+='★'
        }
        
        let div=document.createElement('div')
        div.setAttribute('class','Kcard')
        div.addEventListener('click',()=>{
            Kshowfulldesc(element)
            Kpushdata=element
        })
        let temp=`
        <img src="${element.img}" alt="">
        <p>${element.title}</p>
        <p class='cardprice'>$ ${element.price}</p>
        <p class='Kblue'>${karan}</p>
        `
        div.innerHTML=temp
        console.log(div)
        Kdisplay.append(div)
        
    });
    console.log(Kdisplay)
}

// to show pop details
function Kshowfulldesc(element) {
    let Kdescrip=document.getElementById('Kdescrip')
    // Kdescrip.style.backgroundColor='white'
    Kdescrip.style.display='block'
    Kdescrip.innerHTML=''
    let data=`
    <p class='Kbigdiscp' onclick="closepop()">&#x2613</p>
    <div class='Kbigdiskdiv'>
     <div id="slider">
      <img id='imgsrc' src="${element.img}" alt="">
     </div>
     <div id='cartelement'>
      <h3>${element.title}</h3>
      <p>Color:${element.color}</p>
      <p>$<b> ${element.price}</b></p>
     </div>
    </div>
    `
    Kdescrip.innerHTML=data
    Kaddtocart(element)

}

function closepop() {
    let Kdescrip=document.getElementById('Kdescrip')
    Kdescrip.style.border='2px solid #1377c9'
    Kdescrip.style.display='none'
}

function Kaddtocart(element){
    let button=document.createElement('button')
    button.innerText=`Add To Cart`
    button.style.color='white'
    button.addEventListener('click',()=>{
        let cart=JSON.parse(localStorage.getItem('cart'))||[]
          let flag=true
          cart.forEach((el)=>{
            if(el.id==element.id){
            flag=false
            }
          })
          if(flag){
        Kshowmessage(element)
        cart.push(element)
        localStorage.setItem('cart',JSON.stringify(cart))}
        else{
            Kshowmessages(element)
        }
    })
    let karan=''
    for(let i=0;i<+element.rating;i++){
        karan+='★'
    }
    let rand=0
    let p=document.createElement('p')
    let span1=document.createElement('span')
    span1.innerText=`${karan}`
    span1.setAttribute('class','Kblue')
    let cartelement=document.getElementById('cartelement')
    p.append(span1 )
    cartelement.append(p,button)
    let p1=document.createElement('p')
    p1.innerText=`<`
    p1.addEventListener('click',()=>{
        if(rand>0){
            rand--
            let myimg=document.getElementById('imgsrc')
            myimg.setAttribute('src',element.img)
            console.log(rand) }
    })
    let p2=document.createElement('p')
    p2.innerText=`>`
    p2.addEventListener('click',()=>{
        if(rand<element.image.length-1){
            rand++
            let myimg=document.getElementById('imgsrc')
            myimg.setAttribute('src',element.img)
            console.log(rand)  }
    })
    let slider=document.querySelector('#slider')
    slider.prepend(p1)
    slider.append(p2)
}

function Kshowmessage(data) {
    let Kdescrip=document.getElementById('Kdescrip')
    Kdescrip.innerHTML=''
    Kdescrip.style.height='auto'
    Kdescrip.style.border='4px solid green'
    
        let gif=document.createElement('img')
        gif.setAttribute('class','Kgif')
        gif.setAttribute('src','https://i.pinimg.com/originals/66/22/ab/6622ab37c6db6ac166dfec760a2f2939.gif')

        let h3=document.createElement('h3')
        let span=document.createElement('span')
        span.innerText='✔'
        let span1=document.createElement('span')
        span1.innerText='Product successfully added to your cart!'

        let div=document.createElement('div')
        div.setAttribute('class','cartmessbutt')

        let img=document.createElement('img')
        img.setAttribute('src',data.img)

        let div2=document.createElement('div')
        let p1=document.createElement('p')
        p1.innerText=data.title
        let p2=document.createElement('p')
        p2.innerText=`$ ${data.price}`

        let div3=document.createElement('div')
        let button1=document.createElement('button')
        button1.innerText='Continue Shopping'
        button1.addEventListener('click',closepop)
        let button2=document.createElement('button')
        button2.innerText='Go to CART'
        button2.addEventListener('click',()=>{
            window.location.href='./cart.html'
        })
        h3.append(span,span1)
        div3.append(button1,button2)
        div2.append(p1,p2,div3)
        div.append(img,div2)
        Kdescrip.append(gif,h3,div)


}

function Kshowmessagewrong(data) {
    let Kdescrip=document.getElementById('Kdescrip')
    Kdescrip.innerHTML=''
    Kdescrip.style.height='auto'
    Kdescrip.style.border='4px solid red'
    
        let gif=document.createElement('img')
        gif.setAttribute('class','Kgif')
        gif.setAttribute('src','https://gifimage.net/wp-content/uploads/2018/05/shopping-cart-gif-8.gif')

        let h3=document.createElement('h3')
        let span=document.createElement('span')
        span.innerText='✘'
        span.style.color='red'
        let span1=document.createElement('span')
        span1.innerText=`Product already in your cart!`
        let span3=document.createElement('span')
        span3.innerText=`⚠  you can change quantity in cart page`
        // span1.style.backgroundColor='light red'

        let div=document.createElement('div')
        div.setAttribute('class','cartmessbutt')

        let img=document.createElement('img')
        img.setAttribute('src',data.img)

        let div2=document.createElement('div')
        let p1=document.createElement('p')
        p1.innerText=data.title
        let p2=document.createElement('p')
        p2.innerText=`$ ${data.price}`

        let div3=document.createElement('div')
        let button1=document.createElement('button')
        button1.innerText='Continue Shopping'
        button1.addEventListener('click',closepop)
        let button2=document.createElement('button')
        button2.innerText='Go to CART'
        button2.addEventListener('click',()=>{
            window.location.href='./cart.html'
        })
        h3.append(span,span1)
        div3.append(button1,button2)
        div2.append(p1,p2,div3)
        div.append(img,div2)
        Kdescrip.append(gif,h3,span3,div)


}

function Kdisplaybutton(data) {
    // console.log('k',data)
   let pagebutton=document.getElementById('pagebutton') 
   pagebutton.innerHTML=''
   for(let i=0;i<data.length;i++){
      let button=document.createElement('button')
      button.innerText=`${i+1}`
      button.removeEventListener('click',()=>{
        Kshowdata(data[i])
      })
      button.addEventListener('click',()=>{
        Kshowdata(data[i])
      })
      pagebutton.append(button)
   }
}


// rating filter

let localdata=[]
let pricedatalist=[]
let Krateingfilter=document.querySelectorAll('#Krateingfilter>input')
for(let i=0;i<Krateingfilter.length;i++){
    Krateingfilter[i].addEventListener('change',checkrating) 
}

let ratingflag=true
function checkrating(){
localdata=[]
let count=0
for(let i=0;i<Krateingfilter.length;i++){
    if(Krateingfilter[i].checked==true){
        count=1
        ratingflag=false
        adddata(Kdata,Krateingfilter[i].value)
    }
}
if(count==0){ratingflag=true}
if(ratingflag){
    let temp=Kformatdata(Kdata)
    Kdisplaybutton(temp)
    Kshowdata(temp[0])
}else{
    let temp=Kformatdata(localdata)
    Kdisplaybutton(temp)
    Kshowdata(temp[0])
}
}

function adddata(data,Kvalue){
    data.forEach((element) => {
        if(element.rating==Kvalue){
            let flag=true
            localdata.forEach((ele)=>{
                if(ele==element){
                    flag=false
                }
            })
            if(flag){
            localdata.push(element)}
        }
    });
}

let Kpricefilter=document.querySelectorAll('#Kpricefilter>input[type=checkbox]')
let lastchecked=Kpricefilter[0]

let Kpricestart=document.getElementById('Kpricestart')
let Kpriceend=document.getElementById('Kpriceend')
Kpricestart.addEventListener('input',()=>{
    checkratingempty()
})
Kpriceend.addEventListener('input',()=>{ 
    lastchecked.checked=false
    clearTimeout(p)
    // console.log(checkinput()&&localdata!=[],'a')
    var p=setTimeout(() => {
        if(checkinput()&&localdata!=[]){
            console.log('a')
            let newdata=Kformatdata(Kdata)
            Kshowdata(newdata[0])
            Kdisplaybutton(newdata)
        // }else if(checkinput()){
        //     console.log('b')
        //     let temp=Kformatdata(localdata)
        //     Kdisplaybutton(temp)
        //     Kshowdata(temp[0])
        }
        else{
            console.log('c')
        checkratingempty()}
    }, 2000); 
})

function checkinput() {
    if (Kpricestart.value == '' && Kpriceend.value == '') {
        return true
    }
    return false
}

function checkratingempty() {
    if(!ratingflag){
        sortbyprice(localdata,Kpricestart.value,Kpriceend.value)  
    }else{
        sortbyprice(Kdata,Kpricestart.value,Kpriceend.value)
    }
}

function sortbyprice(data,start,end) {
    let filtered=data.filter((ele)=>{
        if(ele.price>start&&ele.price<=end){
            return true
        }
        return false
    })
    pricedatalist=filtered
    let temp=Kformatdata(filtered)
    Kdisplaybutton(temp)
    Kshowdata(temp[0])
}

for(let i=0;i<Kpricefilter.length;i++){
    Kpricefilter[i].addEventListener('change',()=>{
        lastchecked.checked=false
        Kpriceend.value=Kpricefilter[i].value
        lastchecked=Kpricefilter[i]
        checkratingempty()
    }) 
}
