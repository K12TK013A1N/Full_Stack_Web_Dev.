import express from "express";
const app = express();
app.get("/",(req,res)=>{
  res.send("HELLO WORLD");
});
const port = 3000;
app.listen(port,()=>{
  console.log(`Listening to port ${port}`);
});