const mongoose = require('mongoose');
const User = require('./user');
const Creedentials = require('./creedentials');
const Profile = require('./profile');

mongoose.connect('mongodb+srv://Amberita:9CGRjtJCe0zhhLEp@cluster0.rqbwt4k.mongodb.net/test', 
    {useNewUrlParser: false, useUnifiedTopology: false})

let userDocument = new User({
    login: "a@a.com",
    password: "12345678"
})

let creedentialDocument = new Creedentials({
    address: "Santo Angel",
    phone: "681077530",
    email: "a@a.com"
})

let profileDocument = new Profile({
    name: "Amber",
    surname: "C",
    dateOfBirth: "1997-08-16",
    comments: null,
    role: "admin"
})

// userDocument.save(checkAns);

userDocument.save().then(savedDoc => {
    savedDoc === userDocument;
    console.log('User saved');
})

creedentialDocument.save().then(savedDoc => {
    savedDoc === creedentialDocument;
    console.log('Creedentials saved');
})

profileDocument.save().then(savedDoc => {
    savedDoc === profileDocument;
    console.log('Profile saved');
})


// profileDocument.save(checkAns);

// function checkAns(err, res){
//     if (err) {
//         console.log("Error: " + err);
//     }
//     else {
//         console.log("user saved");
//     }
// }