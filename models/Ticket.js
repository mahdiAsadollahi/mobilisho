const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    category: {
      type: String,
      enum: ["technical", "payment", "order", "product", "account", "other"],
      default: "technical",
      rqeuired: true,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
      rqeuired: true,
    },

    status: {
      type: String,
      enum: ["open", "answered", "closed"],
      default: "open",
      required: true,
    },
    lastActivityAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Ticket || mongoose.model("Ticket", schema);

module.exports = model
