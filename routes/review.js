const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {validateReview,isLoggedIn,isreviewAuthor} = require("../middleware.js")
const reviewController = require("../controller/reviews.js");



//(review) post route

router.post("/",isLoggedIn,validateReview ,wrapAsync(reviewController.createReview));

//Delete review Route
router.delete("/:reviewId",isLoggedIn,isreviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports = router;
