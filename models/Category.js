import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      required: true,
      default: "FiSmartphone",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    productCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const model =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default model;
