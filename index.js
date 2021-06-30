const express =require("express")
const app=express()
const upload=require("express-fileupload");
const route=require("./route")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(upload())

app.use(route);


app.listen(5000,()=>{
    console.log("conected to server succesfully");
})