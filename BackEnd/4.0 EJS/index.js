import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const d = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let today = days[d.getDay()];

app.get("/",(req,res)=>{
  res.render(__dirname+"/views/index.ejs",
    {day : today}
  );
})

app.listen(port,()=>{
  console.log(`live server @ port: ${port}`);
});