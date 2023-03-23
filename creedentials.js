const mongoose  = require('mongoose');

const creedentialsSchema = new mongoose.Schema({
    address: String,
    phone: {
        type: String,
        validate: [
            function (phone) {
                return phone.length > 8;
            },
            'Write a phone number with at least 9 digits'
        ]
    },
    email: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Creedential", creedentialsSchema)