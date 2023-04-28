const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please add the fullname"],
    },
    email: {
      type: String,
      required: [true, "Please add the email address"],
      unique: [true, "Email already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the password"],
    },
    photo: {
      type: String,
      default: "default.png",
    },
    contactNo: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
