const { uniq } = require("lodash");
const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    discountType: {
      type: String,
      enum: [
        "public",
        "specific_product",
        "specific_customer",
        "first_purchase",
      ],
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    value_type: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    value: {
      type: Number,
      requried: true,
      min: 0,
    },
    max_usage: {
      type: Number,
      default: null,
    },
    used_count: {
      type: Number,
      default: 0,
    },
    min_order_amount: {
      type: Number,
      default: 0,
    },
    expiry_date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "expired"],
      default: "active",
    },
    specific_products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    specific_customers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Discount || mongoose.model("Discount", schema);

module.exports = model;
