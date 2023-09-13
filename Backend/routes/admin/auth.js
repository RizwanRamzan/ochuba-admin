const express = require("express");
const router = express.Router();
const {
  userSignup,
  userLogin,
  getAllUsers
} = require("../../controllers/auth.controllers");

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/getallusers", getAllUsers);

module.exports = router;
