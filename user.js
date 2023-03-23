const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true
        },
    password: {
        type: String,
        required: true,
        validate: [
            function (password) {
                return password.length >= 6;
            },
            'Password is not long enough']
    }
});

module.exports = mongoose.model("User", userSchema)
