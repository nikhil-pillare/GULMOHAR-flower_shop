let cartData = JSON.parse(localStorage.getItem("cart"));
// console.log(cartData)
displayCart(cartData);
totalCost(cartData);

let cart_empty = document.querySelector(".cart-empty");
if (cartData.length != 0) {
    cart_empty.classList.add("hide-div");
} else {
    cart_empty.classList.remove("hide-div");
}

function displayCart(data) {
    document.querySelector(".cartcont").innerHTML = "";
    data.forEach((elem, index) => {
        let maindiv = document.createElement("div");
        let leftdiv = document.createElement("div");
        leftdiv.setAttribute('class','product_img')
        let rightdiv = document.createElement("div");
        let anc=document.createElement("a");
       anc.href="./checkout.html";
        let pic = document.createElement("img");
        pic.setAttribute("src", elem.img);
        let title = document.createElement("h2")
        title.innerText = elem.title;
        let cata = document.createElement("h2")
        cata.innerText = elem.category;
        let qty = document.createElement("p");
        qty.innerText = "Qty: " + elem.id;
        let rating = document.createElement("p");
        rating.innerText = "Rating: " + elem.rating;
        let price = document.createElement("h2");
        price.innerText = "$: " + elem.price;

        let calcdiv = document.createElement("div");
        let plus = document.createElement("button");
        plus.innerText = "+";
        plus.addEventListener("click", function () {
            span.innerText++;
            totalCost(cartData);
        })

        let span = document.createElement("span");
        span.setAttribute("class", "qty");
        span.innerText = 1;

        let minus = document.createElement("button");
        minus.innerText = "-";
        minus.addEventListener("click", function () {
            if (span.innerText >= 1) {
                span.innerText--;
            }
            totalCost(cartData);
        })

        let del = document.createElement("button");
        del.innerText = "REMOVE";
        del.addEventListener("click", function () {
            deleteData(cartData, index);
        })
        let buy = document.createElement("button");
        buy.innerText = "BUY";


        anc.append(buy)
        calcdiv.append(minus, span, plus);
        rightdiv.append(title,cata,price,rating, calcdiv, del,anc);
        leftdiv.append(pic);
        maindiv.append(leftdiv, rightdiv)
        document.querySelector(".cartcont").append(maindiv);
    })
}

function totalCost(arr) {
    let qty = document.querySelectorAll(".qty");
    let sum = 0;
    for (let i = 0; i <= qty.length - 1; i++) {
        if (arr.length == 0) {
            sum = 0;
        } else {
            sum = sum + (Number(qty[i].innerText) * arr[i].price);
        }
    }

    document.querySelector(".total").innerText = sum;
}

function deleteData(array, index) {
    array.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(array));
    displayCart(array);
    totalCost(cartData);
}