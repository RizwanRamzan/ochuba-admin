const mongoose = require("mongoose");

const tradingSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "",
  },
  resolution: {
    type: String,
    default: "",
  },
  endDate: {
    type: String,
    default: "",
  },
  endTime: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Trading", tradingSchema);
