const express=require('express');
const subjectsrouter=expreess.subjectsrouter();
subjectdrouter.get("/get",(req,res)=>{
    res.send("getting subjects details");
})
subjectsrouter.save("/save",(req,res)=>{
    res.send("saving subjects details");
})
module.exports=subjectsrouter;