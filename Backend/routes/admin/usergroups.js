const express = require("express");
const { body, validationResult } = require('express-validator');
const router = express.Router();
const {
    createUserGroup,
    getUserGroups,
    deleteUserGroups
} = require("../../controllers/usergroups.controllers");

router.post("/createusergroup", createUserGroup);

router.get("/getallusergroups", getUserGroups);
router.delete("/deleteusergroups", deleteUserGroups);

module.exports = router;
