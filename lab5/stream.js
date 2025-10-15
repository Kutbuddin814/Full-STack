const fs=require("fs")
filestream=fs.createReadStream("log.txt","utf-8")
let readfiledata="";
filestream.on("data",(data)=>{
    console.log(data);
    readfiledata+=data;
});
filestream.on("end",(data)=>{
    console.log("file reading ended");
});
filestream.on("error",()=>{
    console.log("error");
});