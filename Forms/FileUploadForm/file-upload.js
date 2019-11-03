const express = require('express');
const multer = require('multer');

/**
 * Configuring DiskStorage giving destination and filename
 * cb is callback function it's first property is err object
 */
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'tmp/uploads');
    },
    filename: function(req, file, cb) {
        let ext = file.originalname.split(".")[1];
        let filename = file.fieldname + "-" + Date.now() + "." + ext;
        cb(null, filename);
    }
});

/**
 * Filtering files that do not match specific properties
 */
let fileFilter = function(req, file, cb) {
    let mimetypes = ["image/png", "image/jpg", "image/jpeg"];
    if(mimetypes.includes(file.mimetype))
        cb(null, true);
    else 
        cb(null, false);   
}

/**
 * configuting mutler with
 * storage, limits, fileFilter
 */
let upload = multer({
    storage: storage,
    limits: {
        fileSize: 520000,
    },
    fileFilter: fileFilter
});
let router = express.Router();

/**
 * picks file from the param avatar
 * and makes it available through req.file
 */
router.post('/profile', upload.single('avatar'), function(req, res) {
    let metadata = {};
    metadata.fieldName = req.file.fieldname;
    metadata.originalName = req.file.originalname;
    metadata.encoding = req.file.encoding;
    metadata.mimetype = req.file.mimetype;
    metadata.size = req.file.size/1024 + "KB";
    metadata.destination = req.file.destination;
    metadata.filename = req.file.filename;
    metadata.path = req.file.path;
    res.send(metadata);
});

/**
 * MULTI FILE UPLOAD
 */
router.post('/gallery', upload.array('gallery'), function(req, res) {
    let files = [];
    req.files.forEach(e => {
        files.push(getMetaData(e));
    });
    res.send(files);
});

let cupload = upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: "gallery",
        maxCount: 4
    }
]);

router.post('/cool-profile', cupload, function(req, res) {

});

function getMetaData(file) {
    let metadata = {};
    metadata.fieldName = file.fieldname;
    metadata.originalName = file.originalname;
    metadata.encoding = file.encoding;
    metadata.mimetype = file.mimetype;
    metadata.size = file.size/1024 + "KB";
    metadata.destination = file.destination;
    metadata.filename = file.filename;
    metadata.path = file.path;

    return metadata;
}

module.exports = router;