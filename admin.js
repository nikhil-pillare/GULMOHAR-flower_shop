let productID = 0
let newdeleted=0
let edited=0
let newadded=0


let task_name=document.getElementById('task_name')
let dashboard = document.getElementById('dashboard')
let addproduct = document.getElementById('addproduct')
let deletedrender = document.getElementById('deletedrender')
let updateproduct = document.getElementById('updateproduct')

let dashbutton = document.getElementById('dashbutton')
let addbutton = document.getElementById('addbutton')
let editbutton = document.getElementById('editbutton')
let deletebutton = document.getElementById('deletebutton')

dashbutton.addEventListener('click', () => {
    showdashboardpage()
    showdetails()
})

addbutton.addEventListener('click', () => {
    showaddpage()
})
deletebutton.addEventListener('click', () => {
    deletepageproduct()
})
editbutton.addEventListener('click', () => {
    editbuttonpage()
})

showdashboardpage()

// to show dashbooard
function showdashboardpage() {
    dashbutton.style.backgroundColor = 'rgb(254, 203, 203)'
    addbutton.style.backgroundColor = 'rgb(252, 242, 242)'
    editbutton.style.backgroundColor = 'rgb(252, 242, 242)'
    deletebutton.style.backgroundColor = 'rgb(252, 242, 242)'

    dashboard.style.display = 'block'
    addproduct.style.display = 'none'
    deletedrender.style.display = 'none'
    updateproduct.style.display = 'none'
    task_name.innerText='Dashboard'
}

// to show addpage
function showaddpage() {
    addbutton.style.backgroundColor = 'rgb(254, 203, 203)'
    dashbutton.style.backgroundColor = 'rgb(252, 242, 242)'
    editbutton.style.backgroundColor = 'rgb(252, 242, 242)'
    deletebutton.style.backgroundColor = 'rgb(252, 242, 242)'

    addproduct.style.display = 'grid'
    dashboard.style.display = 'none'
    deletedrender.style.display = 'none'
    updateproduct.style.display = 'none'
    task_name.innerText='Add Product'
    fetchAddData()
}

function renderAddedData(data) {
    let parent = document.getElementById('addrender')
    parent.innerHTML = ''
    data.forEach(element => {
        let div = document.createElement('div')
        let img = document.createElement('img')
        img.setAttribute('src', element.img)
        img.style.width = '100%'
        let h4 = document.createElement('h4')
        h4.innerText = element.title
        let p1 = document.createElement('p')
        p1.innerText = 'price' + '-' + element.price
        let p2 = document.createElement('p')
        p2.innerText = 'color' + '-' + element.color
        let p3 = document.createElement('p')
        p3.innerText = 'rating' + '-' + element.rating
        div.append(img, h4, p1,p2, p3)
        parent.append(div)
    });
}

async function fetchAddData() {
    let res = await fetch('https://bored-school-uniform-bull.cyclic.app/flowers')
    let data = await res.json()
    if(productID==0){
    productID = data.length + 1}
    renderAddedData(data)
}

let addDataForm = document.querySelector('#addform>form')
addDataForm.addEventListener('submit', (e) => {
    e.preventDefault()

    createData()
    async function createData() {
        console.log('posting');
        let res = await fetch(`https://bored-school-uniform-bull.cyclic.app/flowers`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: await JSON.stringify({
                'title': addDataForm.title.value,
                'img': addDataForm.img.value,
                'price': addDataForm.price.value,
                'color': addDataForm.color.value,
                'rating': addDataForm.rating.value,
                'id': productID,
            })
        })
        productID++
        newadded++
        addDataForm.reset()
        let parent = document.getElementById('addrender')
        parent.innerHTML = ''
        fetchAddData()
        setTimeout(() => {
            fetchAddData()
        }, 3000);
    }
})


// edit data
function editbuttonpage() {
    editbutton.style.backgroundColor = 'rgb(254, 203, 203)'
    addbutton.style.backgroundColor = 'rgb(252, 242, 242)'
    dashbutton.style.backgroundColor = 'rgb(252, 242, 242)'
    deletebutton.style.backgroundColor = 'rgb(252, 242, 242)'

    updateproduct.style.display = 'grid'
    deletedrender.style.display = 'none'
    addproduct.style.display = 'none'
    dashboard.style.display = 'none'
    task_name.innerText='Edit Product'
    fetchEditData()
}


async function fetchEditData() {
    let res = await fetch('https://bored-school-uniform-bull.cyclic.app/flowers')
    let data = await res.json()
    productID = data.length + 1
    rendereditData(data)
}
let editdataid;
function rendereditData(data) {
    let parent = document.getElementById('updaterender')
    parent.innerHTML = ''
    data.forEach(element => {
        let div = document.createElement('div')
        let img = document.createElement('img')
        img.setAttribute('src', element.img)
        img.style.width = '100%'
        let h4 = document.createElement('h4')
        h4.innerText = element.title
        let p1 = document.createElement('p')
        p1.innerText = 'price' + '-' + element.price
        let p2 = document.createElement('p')
        p2.innerText = 'color' + '-' + element.color
        let p3 = document.createElement('p')
        p3.innerText = 'rating' + '-' + element.rating
        let edit = document.createElement('button')
        edit.innerText = 'Edit'
        edit.style.backgroundColor = 'yellow'
        edit.style.border = 'none'
        edit.style.padding = '5px'
        edit.addEventListener('click', () => {
            let editDataForm = document.querySelector('#updateform>form')
            editDataForm.title.value=element.title
            editDataForm.img.value=element.img
            editDataForm.price.value=element.price
            editDataForm.color.value=element.color||''
            editDataForm.rating.value=element.rating
            editdataid=element.id

        })
        div.append(img, h4, p1,p2, p3, edit)
        parent.append(div)
    });
}

let editDataForm = document.querySelector('#updateform>form')
editDataForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let obj={}

    editData()
    async function editData() {
        let res = await fetch(`https://bored-school-uniform-bull.cyclic.app/flowers/${editdataid}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: await JSON.stringify({
                'title': editDataForm.title.value,
                'img': editDataForm.img.value,
                'price': editDataForm.price.value,
                'color': editDataForm.color.value,
                'rating': editDataForm.rating.value,
            })
        })
        edited++
        console.log(res)
        editDataForm.reset()
        let parent = document.getElementById('updaterender')
        parent.innerHTML = ''
        fetchEditData()
        setTimeout(() => {
            fetchEditData()
        }, 3000);

    }
})



// delete product
async function deletepageproduct() {
    deletebutton.style.backgroundColor = 'rgb(254, 203, 203)'
    addbutton.style.backgroundColor = 'rgb(252, 242, 242)'
    dashbutton.style.backgroundColor = 'rgb(252, 242, 242)'
    editbutton.style.backgroundColor = 'rgb(252, 242, 242)'

    deletedrender.style.display = 'grid'
    addproduct.style.display = 'none'
    dashboard.style.display = 'none'
    updateproduct.style.display = 'none'
    task_name.innerText='Delete Product'

    let res = await fetch('https://bored-school-uniform-bull.cyclic.app/flowers')
    let data = await res.json()
    totalnew=data.length

    let parent = document.getElementById('deletedrender')
    parent.innerHTML = ''
    data.forEach(element => {
        let div = document.createElement('div')
        let img = document.createElement('img')
        img.setAttribute('src', element.img)
        img.style.width = '100%'
        let h4 = document.createElement('h4')
        h4.innerText = element.title
        let p1 = document.createElement('p')
        p1.innerText = 'price' + '-' + element.price
        let p2 = document.createElement('p')
        p2.innerText = 'color' + '-' + element.color
        let p3 = document.createElement('p')
        p3.innerText = 'rating' + '-' + element.rating
        let del = document.createElement('button')
        del.innerText = 'Delete'
        del.style.backgroundColor = 'red'
        del.style.border = 'none'
        del.style.padding = '5px'
        del.addEventListener('click', () => {
            deleteData()
            async function deleteData() {
                let res = await fetch(`https://bored-school-uniform-bull.cyclic.app/flowers/`+ element.id, {
                    method: 'DELETE',
                  })
            }
            parent.innerHTML = ''
            newdeleted++
            deletepageproduct()
            setTimeout(() => {
                deletepageproduct()
            }, 3000);
        })
        div.append(img, h4, p1,p2, p3, del)
        parent.append(div)
    });
}


function showdetails() {
    let newtotal=document.querySelector('#newtotal')
    newtotal.innerText= 40-newdeleted+newadded
    let newadd=document.querySelector('#newadd')
    newadd.innerText=newadded
    let newedit=document.querySelector('#newedit')
    newedit.innerText=edited
    let newdelete=document.querySelector('#newdelete')
    newdelete.innerText=newdeleted
}