console.log("client side javascript has loaded")

// fetch("http://puzzle.mead.io/puzzle").then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


//to get the search value

const weatherForm=document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

//messageOne.textContent = "From javascript"

weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()
const location = search.value
messageOne.textContent = "loading..."
messagetwo.textContent = ""
fetch('http://localhost:3000/weather?search=' + encodeURIComponent(location)).then((response)=>{
 response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = data.location
            messagetwo.textContent = data.forecast
        }
    })
})
})