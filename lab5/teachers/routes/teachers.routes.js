const express=require('express');
const teachersrouter=expreess.teachersrouter();
teachersrouter.get("/get",(req,res)=>{
    res.send("getting teachers deatails");
})
teachersrouter.save("/save",(req,res)=>{
    res.send("saving teachers deatails");
})
module.exports=teachersrouter;