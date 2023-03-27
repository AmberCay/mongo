const Photos = require("../model/photos");
const mongoose = require('mongoose');
const photo = require("../../../photo");

function getStart(req, res) {
    let result = {error: true, code: 200, message: 'Starting point'};
    res.send(result);
}


function getPhoto(req, response) {
    if (req.query.id == null){
        Photos.find({})
        .then((photosRes) => {
            console.log(photosRes);
            response.send(photosRes)
        })
        .catch((err) => {
            console.log(err);
            process.exit(-1)
        })
    }
    else {
        Photos.findById(req.query.id)
        .then((photo) => {
            console.log(photo);
            response.send(photo)
        })
        .catch((err) => {
            console.log(err);
            process.exit(-1)
        })
    }
}

function postPhoto(req, response) {
    console.log(req.body);
    let photo = new Photos({user_name: req.body.user_name,
                                            url: req.body.url,
                                            title: req.body.title,
                                            desc: req.body.desc})
                                    
    photo.save()
    .then((res) => {
        console.log("Photo saved");
        console.log(res);
        response.send(res);
    })
    .catch((error) => {
        console.log(error);
    })
}

function putPhoto(req, response) {
    Photos.updateOne({title: req.body.title}, 
                                    {desc: req.body.desc}).then((res) => {
                                        console.log(res);
                                        response.send(res)
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    })
}

function delPhotos(req, response) {
    let answer;
    if ((req.body.user_name != null) && (req.body.title == null)) {
        Photos.deleteMany({user_name: req.body.user_name}).then((res) => {
            console.log("Photos deleted");
            answer = {error: false, code: 200, message: "deleted user's photo", data: res}
        })
        .catch((err) => {
            answer = {error: true, code: 200, message: String(err), data: res}
        })
    }
    else if ((req.body.user_name != null) && (req.body.title != null)) {
        Photos.deleteOne({user_name: req.body.user_name, title: req.body.title}).then((res) => {
            console.log("Photo deleted");
            answer = {error: false, code: 200, message: "deleted user photo", data: res}
        })
        .catch((err) => {
            answer = {error: true, code: 200, message: String(err), data: res}
        })
    }
}

module.exports = {getStart, getPhoto, postPhoto, putPhoto, delPhotos}