const express = require("express");
const bodyParser = require('body-parser')

const mongoose = require('mongoose');
const app = express();

const itemsSchema = {
  name: String
};
const Item = mongoose.model(
  "Item", itemsSchema
);


app.set('view engine', 'ejs'); // ejs template
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});



//Changing Date
app.get("/", (req, res) => {

  res.render("list", {
    listTitle: "Today",
    newlistItems: items
  });
});

app.post("/", (req, res) => {

  let item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});

//confige work page template
app.get("/work", (req, res) => {
  res.render("list", {
    listTitle: "Work List",
    newlistItems: workItems
  })
});
app.post("/work", (req, res) => {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", (req, res) =>{
  res.render("about");
});

app.listen(3000, () => {
  console.log("Server started on port 3000.")
})
