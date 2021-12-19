//jshint esversion:9
const express = require("express");
require('dotenv').config();

const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground.js");
const remoteURI = process.env.REMOTE_URI + process.env.REMOTE_DB + process.env.REMOTE_DB_OPTIONS;
const uri = 'mongodb://127.0.0.1:27017/yelp-camp';
//process.env.REMOTE_URI+process.env.REMOTE_DB+process.env.REMOTE_DB_OPTIONS
mongoose.connect(remoteURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
).catch(err => console.error(err));



const db = mongoose.connection;
db.on("error", console.error.bind(console, "console connection error:"));
db.once("open", () => {console.log("DB CONNECTED");});



const app = express();


app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

app.get("/", (req, res) => {
    res.render("home");
});

// const sisillyCamp = {
//     title: "Sico",
//     price: 455,
//     description: "admirable place"
// };

// const Camp2 = new Campground(sisillyCamp);

// const run = async () => {
//     await Camp2.save().then((data) => { console.log(data) });  
// };

// run().catch(err=>console.err(err));

app.get("/makecampground", async (req, res) => {
    const camp = new Campground({
        title: "Garden state Massive apple saucex",
        price: 2552,
        description: "Great rave camping"
    }); 
    await camp.save().then(() => { res.json(camp); });
    //res.send(camp);
});






app.listen(3000, () => console.log("SERVER UP:"));
