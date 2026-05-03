module.exports.renderContactUs = async (req,res)=>{
    res.render("pages/contactus.ejs");
}

module.exports.renderPrivacyPolicy = async (req,res)=>{
    res.render("pages/privacypolicy.ejs");
}

module.exports.renderTermsOfService = async (req,res)=>{
    res.render("pages/termsofservice.ejs");
}

module.exports.redirectCotactForm = async (req,res)=>{
    req.flash("success", "Thanks! We’ll get back to you soon.");
    res.redirect("/contactus");
}