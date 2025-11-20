// const Listings = require("../models/listing");
const mongoose =require('mongoose');

const initData = require('./data.js');


const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

main()
    .then(()=>{
        console.log("Connected to the Database successfully");
    })
    .catch((err)=>{
        console.log(err);
    })

async function main(){
    await mongoose.connect(MONGO_URL);
}


for(Data of initData.sampleListings){
    let place = req.body.listing.location;
    const link = `https://api.maptiler.com/geocoding/${place}.json?key=${process.env.MAP_API}`;
    const response = await fetch(link);
    if (!response.ok) throw new Error(`API error: ${res.statusText}`);
    const data = await response.json();
    const newListing = new Listing(req.body.listing);
    newListing.geometry = data.features[0].geometry;
    const savelisting = await newListing.save();
    console.log(savelisting);
}