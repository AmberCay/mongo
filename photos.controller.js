const mongoose = require('mongoose');
const Photo = require('./photo');

mongoose.connect('mongodb+srv://Amberita:9CGRjtJCe0zhhLEp@cluster0.rqbwt4k.mongodb.net/test', 
    {useNewUrlParser: false, useUnifiedTopology: false})

let photoDocument  =new Photo({
    user_name: "amber",
    url: "http://cdn.wallpapersafari.com/32/59/s5tMkr.jpg",
    title: "eepy bunny",
    desc: "Sleepy bunny in blanky"
})

// photoDocument.save().then(savedDoc => {
//     savedDoc === photoDocument;
//     console.log("Photo saved succesfully");
// })

// let data = new Photo ({
//     user_name: "amber",
//     url: "https://images.unsplash.com/photo-1679279726940-be5ce80c632c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
//     title: "Noodles",
//     desc: "Yummy noodle dish"
// })

let data2 = new Photo ({
    user_name: "lillith",
    url: "https://images.unsplash.com/photo-1516934024742-b461fba47600?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    title: "Fox",
    desc: "Funny looking fellar"
})

let data3 = new Photo ({
    user_name: "lillith",
    url: "https://images.unsplash.com/photo-1598541264502-84dc6aa2fb87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
    title: "Gundam",
    desc: "hello computer"
})

// Photo.create(data).then( function() {
//     console.log("Photo saved successfully");
//     mongoose.disconnect();
// })
// .catch( function() {
//     console.log("photo failed to save");
// })

// Photo.insertMany([data2, data3]).then( function() {
//     console.log("Photos saved");
// })
// .catch( function() {
//     console.log("photos failed to save");
// })


function addPhoto(username, url, title, desc){
    let data = new Photo ({
        user_name: username,
        url: url,
        title: title,
        desc: desc
    })
    Photo.create(data).then( function() {
    console.log("Photo saved successfully");
    mongoose.disconnect();
})
.catch( function() {
    console.log("photo failed to save");
})
}

function findByUser(username){
    Photo.find({user_name: username}).then((res) => {
    console.log(res);
})
.catch((err) => {
    console.log(err);
})
}

function updateDescription(title, desc){
    Photo.updateOne({title: title}, {desc: desc}).then((res) => {
    console.log("New description: " + res.desc);
})
.catch((err) => {
    console.log(err);
})
}

function deleteByNameAndTitle(name, title) {
    Photo.deleteOne({user_name: name, title: title}).then((res) => {
    console.log("photo deleted");
    console.log(res);
})
.catch((err) => {
    console.log(err);
});
}

function deleteUserPhotos(username) {
    Photo.deleteMany({user_name: username}).then((res) => {
    console.log("photos deleted");
    console.log(res);
})
.catch((err) => {
    console.log(err);
});
}

addPhoto('amber', 'https://images.unsplash.com/photo-1679641050251-f27bc9f978d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', 'Flowers', 'Red flowers');

findByUser('lillith');

updateDescription('Flowers', 'Pretty red flowers');

deleteByNameAndTitle('lillith', 'Gundam');

deleteUserPhotos('amber')