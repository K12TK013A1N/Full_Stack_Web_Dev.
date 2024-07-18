import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "main",
  password: "shashwat",
  port: 5432
});

let country_code;
let cbc="";
db.connect();
db.query("SELECT country_code FROM visited",(err,res)=>{
  if(err){
    console.error("FAILED TO FETCH");
  }else{
    console.log(res.rows);
    country_code = res.rows;
    country_code.forEach(obj=>{
      cbc += obj.country_code+",";
    })
    console.log(cbc);
  }
})

app.get("/", async (req, res) => {
  //Write your code here.
  const countryCodeObj = await db.query("SELECT country_code FROM visited");
  let ccc = "";
  countryCodeObj.rows.forEach(obj=>{
    ccc += obj.country_code + ",";
  });
  console.log(ccc);
  res.render("index.ejs",{
    total: countryCodeObj.rowCount,
    countries: ccc
  });
});

app.post("/add", async (req,res)=>{
  try{
    const country = req.body.country;
    let countryCodeObj = await db.query("SELECT country_code FROM countries WHERE country_name=($1)",
    [country]);
    const countryCode = countryCodeObj.rows[0].country_code;
    const result = await db.query("INSERT INTO visited (country_code) VALUES ($1)",[countryCode]);
    console.log(result.command);
    const visited = await db.query("SELECT country_code FROM visited");
    console.log(visited.rows);
    let concatcountry = "";
    visited.rows.forEach(obj=>{
      concatcountry += obj.country_code + ","
    });
    console.log(concatcountry);
    res.render("index.ejs",{
      countries: concatcountry,
      total: visited.rows.length
    });
  }catch(err){
    console.error(err.schema);
    console.log("YOU HAVE ALREADY VISITED THIS COUNTRY OR NOT IN LIST.");
    res.redirect("/");
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
