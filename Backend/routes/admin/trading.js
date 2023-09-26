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
const checkAuth = require("../../middleware/check-auth");

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
router.post("/payment", checkAuth, Payment);
router.post("/bid/:id", Bid);
router.post("/result/:id", calculateResult);
router.get("/:type", findTradings);
router.post("/:type", upload.single("image"), createTrading);
router.delete("/:id", findByIdAndDelete);

module.exports = router;
