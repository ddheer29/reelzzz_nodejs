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
    name: {
      type: String,
      maxlength: 50,
    },
    userImage: {
      type: String,
    },
    addressLine1: {
      type: String,
    },
    addressLine2: {
      type: String,
    },
    addressType: {
      type: String,
      enum: ["Home", "Work", "Other"],
    },
    dateOfBirth: {
      type: Date,
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
