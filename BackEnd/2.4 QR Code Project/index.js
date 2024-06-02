/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
inquirer
  .prompt([
    /* Pass your questions in here */
    {
      message: "enter your url",
      name:"URL",
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    var url = answers.URL;
    console.log(url);
    var qr_png = qr.image(url,{ type : "png"});
    qr_png.pipe(fs.createWriteStream("this_.png"));
    fs.writeFile ("USER.txt",url,(err)=>{
      if (err) throw err;
      console.log("FILE SAVER!!");
    })
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console("err");
    } else {
      // Something else went wrong
    }
  });