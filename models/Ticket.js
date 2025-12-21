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
      enum: [
        "technical",
        "financial",
        "sales",
        "general",
        "payment",
        "order",
        "product",
        "account",
        "other",
      ],
      default: "general",
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
      required: true,
    },
    status: {
      type: String,
      enum: [
        "open",
        "answered",
        "closed",
        "customer_reply",
        "waiting",
        "resolved",
      ],
      default: "open",
      required: true,
    },
    lastActivityAt: {
      type: Date,
      default: Date.now,
    },
    createdByAdmin: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Ticket || mongoose.model("Ticket", schema);

module.exports = model;
