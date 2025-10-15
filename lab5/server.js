const express = require('express');
const port=3000;
const studentrouter=require("./student/routes/student.routes")
const subjectsrouter=require("./subjects/routes/subjects.routes")
const teachersrouter=require("./teachers/routes/teachers.routes")
const app = express();
app.get('/',(req, res) => {
   res.send('hello !');
});

app.use("/student",studentrouter);
app.use("/teacher",teachersrouter);
app.use("/subject",subjectsrouter);

app.listen(port, () =>{
        console.log('Listening on 3000');
});