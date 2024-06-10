import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 2800;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  const data = {
    len: req.body.fName.length + req.body.lName.length
  }
  res.render("index.ejs",data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
