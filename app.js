const express = require("express");
const bodyParser = require('body-parser')

const mongoose = require('mongoose');
const app = express();

const itemsSchema = {
  name: String
};
const Item = mongoose.model("Item", itemsSchema);
const item1 = new Item({
  name:"Welcome to your to do list"
});
const item2 = new Item({
  name:"Hit the + button to add a new item."
});
const item3 = new Item({
  name: " <---- Hit this to delete an item."
});
const defaultItems = [item1, item2, item3];
Item.insertMany(defaultItems, function(err){
  if (err) {
    console.log("Something dont work.");
  } else {
    console.log("Seuccsesfully saved default itemss to DB");
  }

});

app.set('view engine', 'ejs'); // ejs template
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});



//Changing Date
app.get("/", (req, res) => {

  res.render("list", {listTitle: "Today",newlistItems: defaultItems});
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
