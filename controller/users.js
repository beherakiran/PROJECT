const User = require("../models/user");
module.exports.renderSignupform = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup = (async(req,res)=>{
    try {
    let {username,email,password} = req.body;
    const newuser = new User({email,username});
    const registereduser = await User.register(newuser,password);
    console.log(registereduser);
    req.login(registereduser,(err)=>{
         if(err){
          return  next(err);
        }
        req.flash('success',"Welcome to WanterLust!");
        res.redirect("/listings");
    })
    } catch (error) {
        req.flash("error",error.message);
        res.redirect("/signup");
    }
});

module.exports.renderloginform = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async(req,res)=>{
    req.flash("success","welcomeBack to Wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
          return  next(err);
        }
        req.flash('success',"you are logged out!");
        res.redirect("/listings");
    })
};