$("button").click(function (e) { 
  e.preventDefault();
  $("h1").css("color","purple");
});
$(".inp1").keydown(function (e) { 
  $("h1").html(e.key);
});