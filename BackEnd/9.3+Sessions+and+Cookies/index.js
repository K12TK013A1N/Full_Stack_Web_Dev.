import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import dotenv from 'dotenv';

const app = express();
const port = 3000;
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: process.env.PG_USR,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PSWRD,
  port: process.env.PG_PORT
});

db.connect();

app.get("/", async(req, res) => {
  res.render("home.ejs");
});

app.get("/secrets", (req,res)=>{
  console.log(req.user);
  if(req.isAuthenticated()){
    res.render("secrets.ejs")
  }else{
    res.redirect("/login");
  }
})

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  try{
    const username = req.body.username;
    const password = req.body.password;
    const saltedps = await bcrypt.hashSync(password,10);
    const result = await db.query("INSERT INTO auth (email,password) "+
      "VALUES "+
      "($1,$2) RETURNING *", [username,saltedps]
    );
    const user = result.rows[0];
    req.login(user,(err)=>{
      console.log(err);
      res.redirect("/secrets");
    })
  }catch(err){
    console.error(err);
    res.render("register.ejs",{
      alr: true
    });
  }
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/secrets",
  failureRedirect: "/login"
}));

passport.use(new Strategy(
  async function verify(username,password,cb){
    try{
      const result = db.query("SELECT * FROM auth WHERE email=($1)",[username]);
      if((await result).rowCount === 0){
        res.render("login.ejs",{
          noemail: true,
        });
      }else{
        const user = (await result).rows[0];
        const storedHashedPassword = user.password;
        try{
          const isSame = await bcrypt.compare(password,storedHashedPassword);
          if(isSame){
            return cb(null,user);
          }else{
            return cb(null,false);
          }
        }catch(err){
          return cb(err);
        }
      }
    }catch(err){
      return cb("user not found !!!");
    }
  }
));

passport.serializeUser((user, cb)=>{
  cb(null,user);
});

passport.deserializeUser((user, cb)=>{
  cb(null,user);
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
