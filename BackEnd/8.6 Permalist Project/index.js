import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "main",
  password: "shashwat",
  port: 5432
});

db.connect();
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function returnTable(){
  const table = await db.query("SELECT * FROM work "+
    "ORDER BY id ASC"
  );
  return table.rows;
}

app.get("/", async(req, res) => {
  let items = await returnTable();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async(req, res) => {
  const task = req.body.newItem;
  const result = await db.query("INSERT INTO work (title) "+
    "VALUES "+
    "($1)", [task]
  );
  res.redirect("/");
});

app.post("/edit", async(req, res) => {
  const id = req.body.updatedItemId;
  const content = req.body.updatedItemTitle;
  await db.query("UPDATE work "+
    "SET title=$2 "+
    "WHERE id=$1", [id,content]
  );
  res.redirect("/");
});

app.post("/delete", async(req, res) => {
  const deletedItemId = req.body.deleteItemId;
  console.log(deletedItemId);
  const result = await db.query("DELETE FROM work "+
    "WHERE id=$1", [deletedItemId]
  );
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
