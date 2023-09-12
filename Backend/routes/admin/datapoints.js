const express = require("express");
const router = express.Router();
const {
  createDataPoint,
  getDataPoints,
  getDataPoint,
  updateDataPoint,
  deleteDataPoint
} = require("../../controllers/datapoints.controllers");

router.post("/createdatapoint", createDataPoint);
router.get("/getalldatapoints", getDataPoints);
router.get("/getdatapoint/:id", getDataPoint);
router.put("/updatedatapoint/:id", updateDataPoint);
router.delete("/deletedatapoint/:id", deleteDataPoint);

module.exports = router;
