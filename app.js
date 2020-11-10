const express = require("express");

const app = express();

app.set('view engine', 'ejs'); // ejs template

app.get("/", (req, res) => {
  var today = new Date();
  var currentDay = today.getDay();
  var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"];
  res.render("list", {
    kindOfDay: weekdays[currentDay]
  });
});



app.listen(3000, () => {
  console.log("Server started on port 3000.")
})
