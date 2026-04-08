const Listing = require("../models/listing");
const maptilerClient = require("@maptiler/client"); //for geocoding
const mapToken = process.env.MAP_TOKEN;
maptilerClient.config.apiKey = mapToken;

module.exports.index = async(req,res)=>{
 const alllistings = await Listing.find({})
    res.render("listings/index.ejs",{alllistings});
};

module.exports.renderNewForm = (req,res,)=>{
    res.render("listings/new.ejs")
};

module.exports.showListing = (async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({path:"reviews",
               populate:{
                path:"author",
               },
    })
     .populate("owner");
    if(!listing){
     req.flash("error","listing you requested does not exist!")
    return res.redirect("/listings");
      }
    console.log(listing);
    res.render("listings/show.ejs",{listing,mapToken:process.env.MAP_TOKEN});
});

module.exports.createListing = async(req,res,next)=>{
    const geoData = await maptilerClient.geocoding.forward(
    req.body.listing.location,
    { limit: 1 }
  ).send();
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};

  newListing.geometry =  geoData.features[0].geometry;

    let savedListing =  await newListing.save();
    console.log(savedListing);
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEdit = (async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
    }
    let originalImgUrl= listing.image.url;
    originalImgUrl.replace("/upload","/upload/w_150");
    res.render("listings/edit.ejs",{listing,originalImgUrl});


});

module.exports.updateListing = (async(req,res) =>{
    // if(!req.body.listing){
    //      throw new ExpressError(400,"send valid data for listing");
    // }
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing},{new:true});
    
    if(typeof(req.file) !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save();
    }
    req.flash("success","listing updated!");
    res.redirect(`/listings/${id}`);
});

module.exports.destroyListing = (async(req,res)=>{
    let {id} = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    req.flash("success","listing Deleted!")
    res.redirect("/listings")
});
