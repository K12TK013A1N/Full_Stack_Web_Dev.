import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 2800;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request in GET:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const participants = req.body["participants"];
    const type = req.body["type"]; 
    // Step 2: Play around with the drop downs and see what gets logged.
    // Use axios to make an API request to the /filter endpoint. Making
    // sure you're passing both the type and participants queries.
    // Render the index.ejs file with a single *random* activity that comes back
    // from the API request.
    // Step 3: If you get a 404 error (resource not found) from the API request.
    // Pass an error to the index.ejs to tell the user:
    // "No activities that match your criteria."
    var baseURL="https://bored-api.appbrewery.com";
    var isRandom = false;
    if(participants == ''){
      if(type!=''){
        baseURL+= "/filter?type="+type;
      }else{
        baseURL+="/random";
        isRandom = true;
      }
    }else if(type==''){
      if(participants!=''){
        baseURL+="/filter?participants="+participants;
      }else{
        baseURL+="/random";
        isRandom = true;
      }
    }else{
      isRandom = false;
      baseURL+="/filter?type="+type+"&participants="+participants;
    }
    console.log(baseURL);
    const response = await axios.get(baseURL);
    const result = response.data;
    console.log(result.length);
    var index = Math.floor(Math.random() * result.length);
    var finalResult;
    if(isRandom){
      finalResult = result;
    }else{
      finalResult = result[index];
    }
    console.log("---------------------------------------------");
    console.log(finalResult);
    console.log("---------------------------------------------");
    res.render("index.ejs",{data: finalResult});
  } catch (error){
    console.error("Failed to make request in POST: ", error.message);
    res.render("index.ejs", {
      error: error.message,
    })
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
