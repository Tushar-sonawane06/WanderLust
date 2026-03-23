const User = require("../models/user.js");

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            req.flash("error", "Username already exists!");
            return res.redirect("/signup");
        }

        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) return next(err);

            req.flash("success", "Welcome to WanderLust!");
            res.redirect("/listings");
        });

    } catch (err) {

            if (err.name === "UserExistsError") {
                req.flash("error", "Username already exists!");
                return res.redirect("/signup");
            }
        
            if (err.code === 11000) {
                req.flash("error", "Username already exists!");
                return res.redirect("/signup");
            }
        
            req.flash("error", err.message);
            res.redirect("/signup");
        
    }
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login =async(req,res)=>{
    req.flash("success", "Welcome to WanderLust! You are Logged In!")
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You have successfully Logged Out!")
        res.redirect("/listings");
    });
};