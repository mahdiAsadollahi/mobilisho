const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  role: {
    type: String,
    default: "USER",
  },
  isBan: {
    type: Boolean,
    default: false,
  },

  refreshToken: String,
});

const model = mongoose.models.User || mongoose.model("User", schema);

module.exports = model;
