//loading core node module for setting path
const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
//__dirname:is a variable it provides path to the current directory file is in
//__dirname:is a variable it provides path to the current file 

const app = express()
const port = process.env.PORT || 3000
//joins the path with the string provided actually going one directory up
//define path for express config
const newPath=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partials = path.join(__dirname,"../templates/partials")
//to set up a dynamic template engine we use set method with key value pairs as given below
//setup handlebars engine and views location 
app.set("view engine", "hbs")
app.set("views",viewsPath)
//registerpartials takes a path to a directory where our partials live
hbs.registerPartials(partials)
//to set up path we use app.get and we use app.render to render the new index file
app.get("",(req, res)=>{
    res.render("index",{
        title:"weather app",
        name : "shakir"
    })
})

//second argument to render contains a object which will set up the hbs file contents dynamically
app.get("/about",(req,res)=>{
    res.render("about",{
        title:"about me"
    })
})
app.get("/help",(req,res)=>{
    res.render("help",{
        title:"help",
        para:"contact me on Bhatshakir16@gmail.com",
        name:"shakir"
    })
})
//including that path in our app
//set up static directory
app.use(express.static(newPath))
//this will allow us to adress a request
//this is the root page
// app.get("",(req,res)=>{
//     res.send("hello express")
// })
//this is the help page
// app.get("/help",(req,res)=>{
//     res.send("help page")
// })
//we can also send back JSON as response we just have to pass an object and express will automatically detect it and stringify it
// app.get("/help",(req,res)=>{
//     res.send({
//         name:"shakir",
//         age: 22
//     })
// })
//this is the about page
// app.get("/about",(req,res)=>{
//     res.send("<h1>about page</h1>")
// })
//this is the weather page
// app.get("/weather",(req,res)=>{
//     res.send("weather page")
// })
//we can also send html as a rsponse
// app.get("/weather",(req,res)=>{
//     res.send({
//         location:"srinagar",
//         forecast:"sunny"
//     })
// })
app.get("/weather",(req,res)=>{
    if(!req.query.search){
        //we use return to stop the function there
       return  res.send({
            error:"you must provide a search term"
        })
    }
    geocode(req.query.search,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({ error })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address

            })
        })
    })
    // res.send({
    //     products:req.query.search
    // })
})
app.get("*",(req,res)=>{
    res.render("errror",{
         errored:"error 404"
    })
})

//call to address any other route
// app.get("*",(req,res)=>{
//    res.send("My 404 page")
// })
//to start a server we will use 'app.listen' this starts a server and has the server listen on port 3000

app.listen(port,()=>{
    console.log("the app is running on port " + port)
})

//with web server we have to manually stop this using the ctrl c command