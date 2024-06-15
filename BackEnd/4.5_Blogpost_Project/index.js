import express from 'express'
import bodyParser from 'body-parser';

const app = express()
const port = 3000
var lastMessage=""

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));
app.get('/',(req,res)=>{
  res.render("index.ejs");
})
app.post('/submit',(req,res)=>{
  lastMessage = req.body.text;
  const data={
    message: lastMessage
  }
  res.render("index.ejs",data)
})
app.post('/',(req,res)=>{
  res.render("index.ejs");
})
app.post('/edit',(req,res)=>{
  const data = {
    edit: lastMessage
  }
  res.render("index.ejs",data);
})
app.listen(port,()=>{
console.log(`live @ port: ${ port}`)
})