const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const wrapAsync = require('../utils/wrapAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require("multer")
const { storage } = require("../cloudinary")
// const upload = multer({dest:"uploads/"})                  The upload variable to store in upload folder
const upload = multer({ storage });

const Campground = require('../models/campground');

router.route('/')
    .get(wrapAsync(campgrounds.index))
    // .post(upload.array("image"),(req,res) =>{        "To upload the images to the upload folder"
    .post(isLoggedIn, upload.array("image"), validateCampground, wrapAsync(campgrounds.createCampground))

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(wrapAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array("image") , validateCampground, wrapAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, wrapAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(campgrounds.renderEditForm))



module.exports = router;