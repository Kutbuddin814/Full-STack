const express=require("express")
const fs=require("fs")
const app=express()
const port=3000;
app.listen(port, () =>{
        console.log('Listening on 3000');
});
app.get("/",(req,res)=>{
    const filepath="lab5/files/sample.mp4";
    const filesize=fs.statSync(filepath).size
    const header={
        "content-length":filesize,
        "content-type":"video/mp4"
    }
    res.writeHead(200,header)
    const stream=fs.createReadStream(filepath)
    stream.pipe(res)
    stream.on("data",(data)=>{
        console.log("data reading")
    })
})