const Listing = require("../models/listing");

require("dotenv").config()
const { geocoding } = require("@maptiler/client");


module.exports.index = async (req,res)=>{
    const { hotelType, search } = req.query;

    let query = {};

    if (hotelType) {
        query.hotelType = hotelType;
    }

    if (search) {
        query.$or = [
            { location: { $regex: search, $options: "i" } },
            { country: { $regex: search, $options: "i" } },
            { title: { $regex: search, $options: "i" } }
        ];
    }

    let page = parseInt(req.query.page) || 1;
    let limit = 12;

    let totalListings = await Listing.countDocuments(query);

    let listings = await Listing.find(query)
        .skip((page - 1) * limit)
        .limit(limit);

    let totalPages = Math.ceil(totalListings / limit);

    res.render("./listings/index.ejs", {
        listings,
        page,
        totalPages,
        hotelType,
        search
    });
};

module.exports.renderNewForm = async (req,res)=>{
    res.render("./listings/new.ejs");
};

module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){ 
        req.flash("error","Listing Does Not Exit !");
        return res.redirect("/listings");
    }
    
    res.render("./listings/show.ejs",{listing});
};

module.exports.createListing = async (req,res,next)=>{
    let place = req.body.listing.location;
    const link = `https://api.maptiler.com/geocoding/${place}.json?key=${process.env.MAP_API}`;
    const response = await fetch(link);
    if (!response.ok) throw new Error(`API error: ${response.statusText}`);
    const data = await response.json(); 
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; 
    if (req.files && req.files.length > 0) {
        newListing.images = req.files.map((file) => ({
            url: file.path,
            filename: file.filename
        }));
    };
    newListing.geometry = data.features[0].geometry;
    const savelisting = await newListing.save();
    console.log(savelisting);
    req.flash("success", "New Listing Added !");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Lsiting Does Not Exist !");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs", {listing,originalImageUrl});
};

module.exports.updateListing = async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id , {...req.body.listing})
    if(typeof req.file !=="undefined"){
        let url = req.file.path;
        let fileName = req.file.fileName;
        listing.image = {url: url, fileName: fileName};
        await listing.save();
    }
    req.flash("success", "Listing Updated !");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted Successfully !");
    res.redirect("/listings");
};

