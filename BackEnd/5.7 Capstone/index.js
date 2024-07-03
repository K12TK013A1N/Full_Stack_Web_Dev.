import express from 'express';
import axios from "axios";

const app = express()
const port = 3000

app.use(express.static("public"));

app.get('/',(req,res)=>{
  res.render("index.ejs");
})

app.post('/sun',async(req,res)=>{
  const ip = await axios.get("https://api.ipify.org");
  const ipv4 = ip.data;
  const address = await axios.get("http://ip-api.com/json/"+ipv4);
  const city = address.data.city;
  const lat = address.data.lat;
  const lon = address.data.lon;
  console.log(lat,lon);
  const config = {
    headers: {"x-access-token":"openuv-1d3xf8rly4j397i-io"}
  };
  const uvdata = await axios.get("https://api.openuv.io/api/v1/uv?lat="+lat+"&lng="+lon,config);
  console.log(uvdata.data.result);
  const uvindex = uvdata.data.result.uv_max;
  let sunscreen = "NO."
  if(uvindex > 11){
    sunscreen = "YES.";
  }
  // const content = {
  //   yourIp: ipv4,
  //   yourCity: city,
  //   yourUv: uvindex,
  //   yourSun: sunscreen,
  // };
  res.render("index.ejs",{
    yourIp: ipv4,
    yourCity: city,
    yourUv: uvindex,
    yourSun: sunscreen
  });
})

app.listen(port,()=>{
console.log(`live @ port: ${ port}`)
})