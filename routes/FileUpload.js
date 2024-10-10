const express = require("express");
const router = express.Router();
//  imageUpload, videoUpload, imageReducerUpload
const {localUpload, imageUpload, videoUpload, imageSizeReducer} = require("../controllers/fileUpload");

// api route
router.post("/localUpload", localUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageReducerUpload", imageSizeReducer);
module.exports = router;
