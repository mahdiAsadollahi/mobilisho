import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    specifications: [
      {
        key: String,
        value: String,
      },
    ],
    variations: [
      {
        type: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        stock: {
          type: Number,
          default: 0,
        },
        sku: {
          type: String,
        },
      },
    ],
    images: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const model =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default model;
