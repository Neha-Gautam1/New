const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const listingConrollers = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");

//Index Route
router.get("/",wrapAsync(listingConrollers.index)
  );
  
  //New Route
 router.get("/new",isLoggedIn ,listingConrollers.renderNewForm);
  
  //Show Route
  router.get("/:id",wrapAsync(listingConrollers.showListing)
  );
  
  //Create Route 
  router.post("/",
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingConrollers.createListing)
  );
  
  
  //Edit Route
  router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingConrollers.editListing)
  );
  
  //Update Route
  router.put("/:id",isLoggedIn,isOwner, upload.single('listing[image]'),validateListing, wrapAsync(listingConrollers.updateListing)
  );
  
  //Delete Route
  router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingConrollers.deleteListing)
  );

  module.exports = router;
