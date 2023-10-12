const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      "Please add a valid email",
    ],
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    unique: [true, "This Phone Number already exists"],
    required: [true, "Please add email"],
  },
  admin: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  profilePhoto: {
    type: String,
    default: "",
  },
  amount: {
    type: Number,
    default: 0,
  },
  profit: {
    type: Number,
    default: 0,
  },
  bids: [],
  history: [],
});

module.exports = mongoose.model("User", userSchema);
