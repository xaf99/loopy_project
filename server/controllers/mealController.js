const asyncHandler = require("express-async-handler");
const Meal = require("../models/mealModel");

//@desc Add Meal
//route POST /api/meals/addMeal
//@access private

const addMeal = asyncHandler(async (req, res) => {
  const new_meal = {
    ...req.body,
    user_id: req.user._id,
  };
  const meal = await Meal.create(new_meal);
  if (meal) {
    res.status(201).json({
      meal,
      message: "Meal added",
    });
  } else {
    res.status(400);
    throw new Error("Meal Data is not valid");
  }
});

//@desc Get Meals
//route GET /api/meals/getMyMeals
//@access private

const getMyMeals = asyncHandler(async (req, res) => {
  // for pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 400;
  const skip = (page - 1) * limit;
  const { user } = req;
  const { noPagination, search } = req.query;

  let query = { user: user?._id };

  if (search && search != "")
    query = {
      ...query,
      name: { $regex: search, $options: "i" },
    };

  const doc =
    noPagination == true
      ? await Meal.find({ user: user?._id }).sort("-updatedAt -createdAt")
      : await Meal.find({ user: user?._id })
          .sort("-updatedAt -createdAt")
          .skip(skip)
          .limit(limit);

  res.status(200).json({
    status: "success",
    results: doc.length,
    data: doc,
  });
});

//@desc Get Meal
//route GET /api/meals/:id
//@access private

const getMeal = asyncHandler(async (req, res) => {
  const meal = await Meal.findById(req.params.id);
  if (meal) {
    res.status(200).json({ data: meal, message: "success" });
  } else {
    res.status(400);
    throw new Error("Meal does not exist");
  }
});

//@desc Update Meal
//route PUT /api/meals/:id
//@access private

const updateMeal = asyncHandler(async (req, res) => {
  const meal = await Meal.findById(req.params.id);
  if (!meal) {
    res.status(404);
    throw new Error("Meal not found");
  }
  if (meal.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user meal");
  }

  const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ updatedMeal, message: "Meal Updated" });
});

//@desc Delete Meal
//route Delete /api/meals/:id
//@access private

const deleteMeal = asyncHandler(async (req, res) => {
  const meal = await Meal.findById(req.params.id);
  if (!meal) {
    res.status(404);
    throw new Error("Meal not found");
  }
  if (meal.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to Delete other user meal");
  }
  await Meal.deleteOne({ _id: req.params.id });
  res.status(200).json({ meal, message: "Meal Deleted" });
});

module.exports = { addMeal, getMyMeals, updateMeal, getMeal, deleteMeal };
