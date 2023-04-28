const mongoose = require("mongoose");

const MealSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add meal namme"],
    },
    color: {
      type: String,
      default: "#0000ff",
    },
    category: {
      type: String,
      enum: [
        "Salads",
        "Appetizers",
        "Main Course",
        "Desserts",
        "Snacks",
        "Drinks",
      ],
      default: "None",
      required: [true, "Please add Meal Category"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bio: {
      type: String,
    },
    ingredients: {
      type: [String],
      default: [],
    },
    instructions: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Meal", MealSchema);
