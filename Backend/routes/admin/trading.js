const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
    createTrading,
    findTradings
} = require("../../controllers/trading.controllers");

var storage = multer.diskStorage({
    destination: "public/uploads",
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  
  var upload = multer({
    storage: storage,
  });

router.post("/:type", upload.single("image"), createTrading);
router.get("/:type", findTradings);

module.exports = router;
