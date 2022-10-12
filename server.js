const express=require('express');
const app=express();

const db_connect=require("./config/db");

app.use(express.urlencoded({extended:false}));
app.use(express.json());

//database connection
db_connect();

//routes
app.use("/api/Blog",require("./api/Blog"));

//checking
app.get("/",(req,res)=>{
    res.send("Server listening")
})
app.listen(3000,()=>console.log("Server listening at port 3000"));
