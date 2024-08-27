function App() {
  var greeting = "GoodMorning"
  var date = new Date();
  var time = date.getTime();
  var theme = {
    color : "red",
  }
  if(time>12){
    greeting = "GoodAfterNoon";
    theme.color = "green";
  }else if(time >18 && time <23){
    greeting = "GoodEvening";
    theme.color = "blue";
  }
  var obj = <h1 style={theme} className="heading">{greeting}</h1>
  return obj
}

export default App
