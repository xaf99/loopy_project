const express = require("express");
const {
  validateToken,
  restrictTo,
} = require("../middleware/validateTokenHandler");
const {
  
} = require("../controllers/mealController");

const router = express.Router();

router.route("/").post(validateToken,addMeal).get(validateToken,getMyMeals);
router.route("/:id").get(validateToken,getMeal).put(validateToken,updateMeal).delete(validateToken,deleteMeal);

module.exports = router;