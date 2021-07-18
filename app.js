const express = require("express");
const bodyParser = require('body-parser');
const _ = require("lodash");

const mongoose = require('mongoose');
const app = express();

const itemsSchema = {
  name: String
};
const Item = mongoose.model("Item", itemsSchema);
const item1 = new Item({
  name: "Welcome to your to do list"
});
const item2 = new Item({
  name: "Hit the + button to add a new item."
});
const item3 = new Item({
  name: " <---- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];
//
const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);




app.set('view engine', 'ejs'); // ejs template
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://admin-denystry:pswd@cluster0.hoh1u.mongodb.net/todolistDB", {
  useNewUrlParser: true
});



//Changing Date
app.get("/", (req, res) => {
  Item.find({}, (err, foundItems) => {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log("Something dont work.");
        } else {
          console.log("Seuccsesfully saved default itemss to DB");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {
        listTitle: "Today",
        newlistItems: foundItems
      });
    }
  })
});
// Добавление динамический листов
app.get("/:customListName", (req, res) => {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({
    name: customListName
  }, (err, foundList) => {
    if (!err) {
      if (!foundList) {
        const list = new List({
          // Создание нового списка
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        console.log("Exists!");
        res.render("list", {
          listTitle: foundList.name,
          newlistItems: foundList.items
        });
      }
    }
  });


});



app.post("/", (req, res) => {

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({
      name: listName
    }, (err, foundList) => {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    })
  }

});

app.post("/delete", (req, res) => {
  const checkedItemId = req.body.chekbox;
  const listName = req.body.listName;

  if (listName === "Today"){
    Item.findByIdAndRemove(checkedItemId, (err) => {
      if (!err) {
        console.log("No errors.item ID" + checkedItemId + " deleted  Seuccsesfully!");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({name: listName},{$pull: {items:{_id: checkedItemId}}},(err, foundList)=>{
      if (!err) {
        res.redirect("/" + listName);
      }
    })
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

app.get("/about", (req, res) => {
  res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
  console.log("Server started on port 3000.")
})
