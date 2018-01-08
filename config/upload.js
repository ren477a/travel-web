var multer = require('multer');
const path = require('path');
var AWS = require('aws-sdk');
var multerS3 = require('multer-s3');


AWS.config.update({
    region: 'ap-southeast-1',
    accessKeyId: process.env.S3_KEY_ID,
    secretAccessKey: process.env.S3_ACCESS_KEY
});

const s3 = new AWS.S3();

const storage = multerS3({
    s3: s3,
    bucket: 'travelcatalog',
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        let fullPath = 'tours/' + Date.now().toString() + '-' + file.originalname;
        cb(null, fullPath)
    }
});


const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

//var upload = multer({ dest: 'uploads/' });
module.exports = upload;