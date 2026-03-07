const Listing = require("../models/listing");

require("dotenv").config()

module.exports.mainPage = async (req,res)=>{
    const cities = ["Pune", "Mumbai", "Delhi", "Bengaluru", "chennai"];

    let listingsByCity = {};
  
    for (let city of cities) {
      listingsByCity[city] = await Listing.find({ location: new RegExp(city, "i") }).limit(5);
    }
  
    res.render("listings/main", { listingsByCity });
}
