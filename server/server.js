const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(errorHandler);

app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/meals", require("./routes/mealRoutes"));

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
