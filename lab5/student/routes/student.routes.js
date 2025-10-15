const express=require('express');
const studentrouter=expreess.studentrouter();
studentrouter.get("/get",(req,res)=>{
    res.send("getting student details");
})
studentrouter.save("/save",(req,res)=>{
    res.send("saving student details");
})
module.exports=studentrouter;