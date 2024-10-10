const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DB Connected succesfully");
    })
    .catch((error) => {
        console.error(error);
        console.log(`${error.message}`);
        process.exit(1);
    })
}