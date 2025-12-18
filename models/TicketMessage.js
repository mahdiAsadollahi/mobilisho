const { default: mongoose, mongo } = require("mongoose");

const schema = new mongoose.Schema(
  {
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
      index: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderType: {
      type: String,
      enum: ["USER", "ADMIN"],
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const model =
  mongoose.models.TicketMessage || mongoose.model("TicketMessage", schema);

module.exports = model;
