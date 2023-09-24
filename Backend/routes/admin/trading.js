const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  createTrading,
  findTradings,
  findAllTradings,
  findByIdAndDelete,
  calculateResult,
  Payment,
  Bid
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

router.get("/", findAllTradings);
router.get("/:type", findTradings);
router.post("/:type", upload.single("image"), createTrading);
router.delete("/:id", findByIdAndDelete);
router.post("/result/:id", calculateResult);
router.post("/payment", Payment);
router.post("/bid/:id", Bid);

module.exports = router;
