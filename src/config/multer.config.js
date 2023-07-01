const multer = require("multer")

storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/images/');
    },
    filename: function (req, file, cb) {
        const fecha = new Date();
        const timestamp = fecha.getTime();
        const ext = file.originalname.split('.')[1];
        cb(null, timestamp + '.' + ext);
    }
})

module.exports = { storage };