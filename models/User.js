const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
      match: [/^\+?[1-9]\d{7,14}$/, "Please provide a valid phone number"],
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    username: {
      type: String,
      // required: true,
      match: [/^[a-zA-Z0-9_]{3,30}$/, "Please provide a valid username"],
      unique: true,
    },
    name: {
      type: String,
      maxlength: 50,
      minlength: 3,
    },
    userImage: {
      type: String,
    },
    bio: {
      type: String,
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.methods.createAccessToken = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

UserSchema.methods.createRefreshToken = function () {
  return jwt.sign({ userId: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

UserSchema.index({ followers: 1 });
UserSchema.index({ following: 1 });

const User = mongoose.model("User", UserSchema);

module.exports = User;
