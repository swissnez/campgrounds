//jshint esversion:9

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cities = require("./cities.js");
const { places, descriptors } = require("./seedHelpers.js");

const Campground = require("../models/campground.js");

const remoteURI = require("../app");
//const uri = require("../app");
console.log(remoteURI);



mongoose.connect(remoteURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("DB (INDEX) CONNECTED"));


const sample = array => array[Math.floor(Math.random() * array.length)];




const seedDB = async () => {
    await Campground.deleteMany({}).then((deleted) => console.dir(`DELETED ${deleted}`) );  
    // const c = new Campground({ title: "micky logs you up" });
    // await c.save().then((data) => console.log(data) );
    for (let i = 1; i < places.length; i++){
        const randomNum = Math.floor(Math.random() * 1000);
        const camp =  new Campground({
            location: `${cities[randomNum].city}, ${cities[randomNum].state}`,
            title: `${sample(places)} ${sample(descriptors)}`
        });

        await camp.save().then((d) => console.log(d));
    }
    
};
seedDB().then(() => mongoose.connection.close());


//  const Camp2 = new Campground({
    
//     title: `${sample(places)} ${sample(descriptors)}`
//  });

// (async  ()=>  {
//     await Camp2
//         .save()
//         .then(data => console.log(data));   
// })()
//     .then(() => mongoose.connection.close())
//     .catch(err => console.error(err));

// transaction().then(() => {
//     mongoose.connection.close(); 
// });