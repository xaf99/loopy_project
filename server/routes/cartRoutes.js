const express = require("express");
const { validateToken } = require("../middleware/validateTokenHandler");
const {
  viewCart,
  addMealToCart,
  removeMealFromCart,
} = require("../controllers/cartController");

const router = express.Router();

router.get("/viewCart", validateToken, viewCart);
router.put("/addMealToCart", validateToken, addMealToCart);
router.put("/removeMealFromCart", validateToken, removeMealFromCart);

module.exports = router;
