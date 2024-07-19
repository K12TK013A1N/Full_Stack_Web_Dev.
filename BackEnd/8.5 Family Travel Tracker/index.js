import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import { name } from "ejs";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "main",
  password: "shashwat",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function getUsers(){
  const result = await db.query("SELECT * FROM users");
  return result.rows;
}

let currentUserId = 1;

let users = await getUsers();

async function checkVisisted() {
  const result = await db.query("SELECT country_code, color "+
    "FROM visited AS v "+
    "JOIN countries AS c ON v.country_id=c.id "+
    "JOIN users AS u ON v.person_id=u.id "+
    "WHERE person_id=($1)",
    [currentUserId]
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  console.log(result.rows);
  let color;
  if(result.rows.length == 0){
    color = "teal";
  }else{
   color = result.rows[0].color;
  }
  let ans = [countries,color];
  console.log(ans);
  return ans;
}
app.get("/", async (req, res) => {
  // const countries_colors = await checkVisisted()[0];
  // console.log(countries_colors);
  // const countries = await countries_colors[0];
  // const color = await countries_colors[1];
  let ans = await checkVisisted();
  const countries = ans[0];
  const color = ans[1];
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: color,
  });
});

async function getCountryId(countryName){
  const result = await db.query("SELECT id FROM countries WHERE LOWER(country_name) LIKE $1 || '%';",
    [countryName.toLowerCase()]
  )
  return result.rows;
}


app.post("/add", async (req, res) => {
  const input = req.body["country"];
  try {
    const result = await getCountryId(input);
    const countryCode = result[0].id;
    try {
      await db.query(
        "INSERT INTO visited (person_id,country_id) VALUES ($1,$2)",
        [currentUserId,countryCode]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
  // console.log(req.body)
  if(req.body.user){
    currentUserId = req.body.user;
    console.log("current user ID: ",currentUserId);
    res.redirect("/");
  }else{
    res.redirect("/new");
  }
});

app.get("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  res.render("new.ejs");
});

app.post("/new", async(req,res) => {
  console.log(req.body);
  const person_name = req.body.name;
  const person_color = req.body.color;
  db.query("INSERT INTO users (name,color) "
    +"VALUES "+
    "($1,$2)", [person_name,person_color]
  );
  users = await getUsers();
  res.redirect("/");
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
