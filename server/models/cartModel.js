const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  meals: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meal" }],
  },
});

module.exports = mongoose.model("Cart", CartSchema);
