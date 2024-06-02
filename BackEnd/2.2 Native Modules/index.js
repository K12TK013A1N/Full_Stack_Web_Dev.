const fs = require("fs");

// fs.writeFile("lmao.txt","this is line 1", function(err){
//   if (err) throw err;
//   console.log("waba laba dub dub");
// });

fs.readFile('./message.txt','utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);
}); 