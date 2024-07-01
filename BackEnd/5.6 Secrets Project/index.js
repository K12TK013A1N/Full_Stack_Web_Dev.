// HINTS:
// 1. Import express and axios
import express from "express";
import axios from "axios";

// 2. Create an express app and set the port number.
const app = express();
const port = 2800;
// 3. Use the public folder for static files.
app.use(express.static("public"));
// 4. When the user goes to the home page it should render the index.ejs file.
app.get("/", async(req,res)=>{
  // secret and the username of the secret.
  try{
    const reqData = await axios.get("https://secrets-api.appbrewery.com/random");
    console.log(reqData.data.secret);
    res.render("index.ejs",{
      secret: JSON.stringify(reqData.data.secret),
      user: JSON.stringify(reqData.data.username)
    });
  }catch(error){
    res.status(500);
    console.log(error.response.data);
  }
});
// 5. Use axios to get a random secret and pass it to index.ejs to display the

// 6. Listen on your predefined port and start the server.
app.listen(port, ()=>{
  console.log(`Server running on port ${port}`);
});