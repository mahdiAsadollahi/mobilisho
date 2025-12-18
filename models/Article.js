const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    summary: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published", "arshived"],
      default: "draft",
      required: true,
    },
    category: {
      type: String,
      requried: true,
    },
    readingTime: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    seoTitle: {
      type: String,
      required: true,
    },
    seoDescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Article || mongoose.model("Article", schema);

module.exports = model;
