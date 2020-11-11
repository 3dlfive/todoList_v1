const express = require("express");
const bodyParser = require('body-parser')

const app = express();



app.set('view engine', 'ejs'); // ejs template
app.use(bodyParser.urlencoded({extended:true}));

var item ="";

//Changing Date
app.get("/", (req, res) => {
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var day = today.toLocaleDateString("en-US",options);
  res.render("list", {
    kindOfDay: day,
    newlistItem: item
  });
});


app.post("/",(req,res)=>{
  var item = req.body.newItem;
  console.log(item);
  res.redirect("/");
});


app.listen(3000, () => {
  console.log("Server started on port 3000.")
})
