//jshint esversion:9
const express = require("express");
require('dotenv').config();

const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground.js");
const methodOverride = require("method-override");
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
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.get("/", (req, res) => res.render("home"));

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


app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new.ejs", {}); 
});

app.post("/campgrounds", async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground
        .save()
        .then(data =>  console.log(data))
        .catch(err => console.error(err));
    
    
    res.redirect(`/campgrounds/${campground._id}`);
    
});

app.get("/campgrounds/:id", async (req, res) => {

    const campground = await Campground.findById(req.params.id);
    const { _id } = campground;

    if(campground) res.render("campgrounds/show", {campground}); 
});

app.get("/campgrounds/:id/edit", async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if(campground) res.render("campgrounds/edit", {campground}); 
});

app.put("/campgrounds/:id", async (req, res) => {
    res.send("POST PUT worked"); 
});

app.listen(3000, () => console.log("SERVER UP:"));
