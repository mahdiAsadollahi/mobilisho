const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      index: true,
    },
    code: {
      type: String,
      required: true,
    },
    codeHash: {
      type: String,
      required: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: "2m" },
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
