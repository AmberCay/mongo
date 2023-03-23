const mongoose  = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: String,
    surname: String,
    dateOfBirth: Date,
    comments: [{body: String, date: Date}],
    role: String
})

profileSchema.pre('save', function(next){
    console.log("Middleware de entrada");
    if (this.role == "admin") {
        console.log('Bienbenide admin');
    }
    else {
        console.log('Bienvenide usuarie');
    }
    next();
});

module.exports = mongoose.model("Profile", profileSchema)