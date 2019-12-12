const express = require("express");
const bodyParser = require("body-parser");

// this is how you use the express module
const app = express();

// this is how you use ejs
app.set("view engine", "ejs");

// this is how you use body-parser module
app.use(bodyParser.urlencoded( {extended : true} ) );

// to make sure we can serve up the static files, like css, or any images etc.
app.use(express.static("public"));

// this is our collection that stores items
let items = ["Buy food", "Cook food", "Eat food"];

// get method for home route
app.get("/", function(req, res){

    // * take care of the date stuff here * export this bruh
    let today = new Date();
    
    // this guy is used to format the date
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    
    let day = today.toLocaleDateString("en-US", options);
    console.log(day);

    // * date stuff over *

    res.render("list", {kindOfDay : day, newListItems: items} );

});

app.post("/", function(req, res){
    let myItem = req.body.newItem;
    items.push(myItem);
    console.log(myItem);    

    res.redirect("/");
});

// good old listen method
app.listen(3000, function(){
    console.log("Server is running on port 3000");
});