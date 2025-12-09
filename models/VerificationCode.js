const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expireAfterSeconds: 300 },
    },
  },
  {
    timestamps: true,
  }
);

const model =
  mongoose.models.VerificationCode ||
  mongoose.model("VerificationCode", schema);

module.exports = model;
