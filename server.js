
const express = require('express');
const mongoose  = require('mongoose')
const path = require('path')

const app =  express();

const port = 2000;
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/sales')

const db = mongoose.connection;

app.use(express.static(__dirname));


db.once('open',()=>{
    console.log("Mongo db connected...")
})

 const userSchema =  new mongoose.Schema({
      books:String,
      name:String,
      location:String,
      pay:String,
      

      

})

const Users = mongoose.model("data", userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
  
})


app.post("/submit1",async(req,res)=>{

    // if(app.post("/submit1")){

    //     chemistry = "chemistry";
    //     Rate = "400"

    // }
    const {books,name,location,pay} = req.body;

    const user = new Users ({
        books,
        name,
        location,
        pay,
       
    })
    await user.save();
     console.log(user);
     res.send("Form Submisson Succesfull")
})


    

app.listen(port,()=>{
    console.log("Server Started",port)
})

