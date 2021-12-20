//jshint esversion:9
const express = require("express");
require('dotenv').config();

const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground.js");
const remoteURI = process.env.REMOTE_URI + process.env.REMOTE_DB + process.env.REMOTE_DB_OPTIONS;
const uri = 'mongodb://127.0.0.1:27017/yelp-camp';
//process.env.REMOTE_URI+process.env.REMOTE_DB+process.env.REMOTE_DB_OPTIONS
const cities = require("./seeds/cities.js");


mongoose.connect(remoteURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
).catch(err => console.error(err));

module.exports = remoteURI;



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


app.get("/campgrounds", async (req, res) => { 
    const campgrounds = await Campground.find({});
    //res.json(campgrounds);
    res.render("campgrounds/index.ejs", {campgrounds});
});




app.get("/makecampground", async (req, res) => {
    const camp = new Campground({
        title: "Garden state Massive apple saucex",
        price: 2552,
        description: "Great rave camping"
    }); 
    await camp.save().then(() => { res.json(camp); });
    //res.send(camp);
});

app.get("/delete", async (req, res) => {
    await Campground.deleteMany({}).then((data) => res.json(data)); 
});

app.get("/campgrounds/:id", async (req, res) => {

    const campground = await Campground.findById(req.params.id);
    const { _id } = campground;
    console.log(_id);
    if(campground) res.render("campgrounds/show", {campground}); 
});

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new.ejs", {}); 
});


app.get("/cities", (req, res) => res.json(cities));


app.listen(3000, () => console.log("SERVER UP:"));
