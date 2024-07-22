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

db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  try{
    console.log(req.body.username, req.body.password);
    const username = req.body.username;
    const password = req.body.password;
    const result = await db.query("INSERT INTO auth (email,password) "+
      "VALUES "+
      "($1,$2)", [username,password]
    );
    console.log(result);
    res.redirect("/");
  }catch(err){
    console.error(err);
    res.render("register.ejs",{
      alr: true
    });
  }
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const result = await db.query("SELECT id FROM auth "+
    "WHERE email=($1) AND password=($2)", [username,password]
  );
  if(result.rowCount === 0){
    res.render("login.ejs",{
      noentry: true
    });
  }else{
    res.render("secrets.ejs");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
