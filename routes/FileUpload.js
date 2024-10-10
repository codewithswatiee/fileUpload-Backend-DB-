const express = require("express");
const router = express.Router();
//  imageUpload, videoUpload, imageReducerUpload
const {localUpload} = require("../controllers/fileUplaod");

// api route
router.post("localUpload", localUpload);

module.exports = router;
