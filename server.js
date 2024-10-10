// imports
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const db = require('./config/database');
const cloudinary = require('./config/cloudinary');
require("dotenv").config();
const Upload = require('./routes/FileUpload');


// Port
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(fileUpload());

// connection to db
db.connect();

// connection to cloudinary
cloudinary.cloudinaryConnect();

// routes
app.use('api/v1/upload', Upload);

// activate
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
})