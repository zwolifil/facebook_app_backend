const multer = require('multer');

module.exports = function(app) {
    const Storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, "../facebook-like-app/src/Images");
        },
        filename: function(req, file, callback) {
            callback(null, file.originalname);
        }
    });

    const upload = multer({
        storage: Storage
    }).array("imgUploader", 3);

    app.post("/images", function(req, res) {
        upload(req, res, function(err) {
            if (err) {
                return res.send(err.message);
            }
            return res.send(upload.files);
        });
    });

};