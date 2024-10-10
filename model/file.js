const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();
const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String
    },
    tags:{
        type: String
    },
    email:{
        type: String
    }
});


// post middleware
fileSchema.post("save", async function(doc) {
    try{
        let transporter = nodemailer.createTransport({
            host:  process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        })

        let info = await transporter.sendMail({
            from: `Swati`,
            to: doc.email,
            subject: "New File Uploaded",
            html: `<h2>Hello</h2> <p> I Hate you <p>`,
        })

        console.log(info);
    } catch(err){
        console.error(err);
    }
})


const File = mongoose.model("File", fileSchema);
module.exports = File;