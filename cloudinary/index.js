const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary')


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,     //compulsary variable names
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "YelpCamp",                            //Folder in cloudinary in which we want to save
        allowedFormats: ["jpeg", "png", "jpg"]
    }
})

module.exports = {
    cloudinary,
    storage
}