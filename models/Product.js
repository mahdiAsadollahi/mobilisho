const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema(
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
      rqeuired: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    specifications: [{ key: String, vlaue: String }],
    variations: {
      type: String,
      value: String,
      price: Number,
      stock: Number,
    },
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

const model = mongoose.models.Product || mongoose.model("Product", schema);

export default model;
