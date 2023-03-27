const {Router} = require('express');
const router = Router();
const photosCTRL = require('../controllers/photos.controller');

router.get("/", photosCTRL.getStart)

router.get("/photos", photosCTRL.getPhoto)

router.post("/photos", photosCTRL.postPhoto)

router.put("/photos", photosCTRL.putPhoto)

router.delete("/photos", photosCTRL.delPhotos)

module.exports = router