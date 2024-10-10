const cloudinary = require("cloudinary").v2;
const File = require("../model/file");

// localFileUpload => Handler 
exports.localUpload = async (req, res) => {
    try{
        // fetch file
        const file = req.files.file;
        console.log(file);

        // servver path
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log(path);
        file.mv(path, (err) => {
            console.log(err);
        });
        res.json({
            success: true,
            message: "File uploaded successfully",
        })
    } catch(err){
        console.log(err);
        res.json({
            success: false,
            message: "Failed to upload File",
        })
    }
}

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloud(file, folder, quality){
    const options = {folder};
    options.resource_type = "auto";
    if(quality){
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
exports.imageUpload = async (req, res) => {
    try{
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes = ['jpg', 'jpeg', 'pdf', 'png'];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported",
            })
        }        

        // file format supported
        const response = await uploadFileToCloud(file, "fileUpload");

        // db mein entry save krni hai
        const fileData = await File.create({
            name, tags, email, imageUrl: response.secure_url
        })

        res.json({
            success: true,
            message: "File uploaded successfully",
        })
    } catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "File not uploaded",
        })
    }
}


exports.videoUpload = async (req, res) => {
    try{
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log(file);

        // validation
        const supportedTypes = ['mp4', 'mov'];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported",
            })
        }        

        // file format supported
        const response = await uploadFileToCloud(file, "fileUpload");

        // db mein entry save krni hai
        const fileData = await File.create({
            name, tags, email, imageUrl: response.secure_url
        })

        res.json({
            success: true,
            res: fileData,
            message: "Video uploaded successfully",
        })
    } catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Video not uploaded",
        })
    }
}

exports.imageSizeReducer = async (req, res) => {
    try{
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes = ['jpg', 'png', 'jpeg'];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported",
            })
        }        

        // file format supported
        const response = await uploadFileToCloud(file, "fileUpload", 30);

        // db mein entry save krni hai
        const fileData = await File.create({
            name, tags, email, imageUrl: response.secure_url
        })

        res.json({
            success: true,
            res: fileData,
            message: "Video uploaded successfully",
        })
    } catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Video not uploaded",
        })
    }
}