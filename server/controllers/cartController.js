const asyncHandler = require("express-async-handler");

//@desc Add Meal To Cart
//route POST /api/meals/addMealToCart
//@access private

const addMealToCart = asyncHandler(async (req, res) => {
  const { user } = req;
  const { mealId } = req.body;

  const updatedCart = await Cart.findByIdAndUpdate(
    user?.cart,
    { $push: { meals: mealId } },
    { new: true }
  );

  res.status(201).json({
    status: "success",
    data: updatedCart,
  });
});

//@desc Remove Meal From Cart
//route PUT /api/meals/removeMealFromCart
//@access private

const removeMealFromCart = asyncHandler(async (req, res) => {
  const { user } = req;
  const { mealId } = req.body;

  const updatedCart = await Cart.findByIdAndUpdate(
    user?.cart,
    { $pull: { meals: mealId } },
    { new: true }
  );

  res.status(201).json({
    status: "success",
    data: updatedCart,
  });
});

//@desc View Cart
//route GET /api/meals/viewCart
//@access private

const viewCart = asyncHandler(async (req, res) => {
  const { user } = req;
  const foundCartData = await Cart.find({}).populate("meals");
  const data = await foundCartData.meals.map((ele) => {
    return ele.user_id == user?._id;
  });

  res.status(201).json({
    status: "success",
    data,
  });
});

module.exports = { addMealToCart, viewCart, removeMealFromCart };
