const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    user_name: String,
    url: String,
    title: String,
    desc: String
});

module.exports = mongoose.model("Photo", photoSchema, "photos")