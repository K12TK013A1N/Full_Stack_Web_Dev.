import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";

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

app.get("/", async(req, res) => {
  // const hash = bcrypt.hashSync("mjolnir",2);
  // console.log(hash);
  // const check = bcrypt.compareSync("mjolnir","$2b$04$BR9r3zBOuNEGSSRnVFOmg.F8EJN.3a05YZmB5xZ0J973nJwpHl8Ke");
  // console.log(check);
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
    const saltedps = await bcrypt.hashSync(password,10);
    const result = await db.query("INSERT INTO auth (email,password) "+
      "VALUES "+
      "($1,$2)", [username,saltedps]
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
  const email = req.body.username;
  const password = req.body.password;
  // console.log(password);
  const salted = await db.query("SELECT password FROM "+
    "auth WHERE email=($1)", [email]
  )
  // console.log(saltedps);
  if(salted.rowCount === 0){
    res.render("login.ejs",{
      noemail: true
    })
  }
  try{
    const saltedps = salted.rows[0].password;
    const result = bcrypt.compareSync(password,saltedps);
    console.log(result);
    if(result){
      res.render("secrets.ejs");
    }else{
      res.render("login.ejs",{
        noentry: true
      });
    }
  }catch(err){
    res.render("login.ejs");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
