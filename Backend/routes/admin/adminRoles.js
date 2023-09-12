const express = require("express");
const router = express.Router();
const {
  createAdminRoles,
  getAdminRoles,
  getAdminRole,
  updateAdminRole,
  deleteAdminRole
} = require("../../controllers/adminRoles.controllers");

router.post("/createrole", createAdminRoles);
router.get("/getallroles", getAdminRoles);
router.get("/getrole/:id", getAdminRole);
router.put("/updaterole/:id", updateAdminRole);
router.delete("/deleterole/:id", deleteAdminRole);

module.exports = router;
