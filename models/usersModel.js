const mongoose = require("mongoose");
//const { v4: uuidv4 } = require('uuid')
const bcrypt = require("bcryptjs");
const validator = require("validator");
const USER_ROLES = require("../utils/constant");

const userSchema = new mongoose.Schema({
  // user_id:{
  //     type: String,
  //     default: uuidv4
  // },
  name: {
    type: String,
    required: [true, "please provide your name"],
  },
  email: {
    type: String,
    required: [true, "please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  // role:{
  //     type:String,
  //     enum:[...Object.values(USER_ROLES)],
  //     default: Object.values(USER_ROLES.ADMIN)
  // },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlenght: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password; //to validate that password and confirm password are the same
      },
      message: "password are the same with passwordConfirm",
    },
  },
  passwordChangedAt: Date,
  //USER_ROLE['USER']
  // age
  // gender
  // marital status
});

userSchema.pre("save", async function (next) {
  // only run if password is modified
  if (!this.isModified("password")) return next();
  //Hash the password with cost 0f 12
  this.password = await bcrypt.hash(this.password, 12);
  //restrict the passwordconfirm from getting saved into the database
  this.passwordConfirm = undefined;
});
//to compare the newpassword inputted to saved password in the database when logging in
userSchema.methods.correctPassword = async function (
  newPassword,
  userPassword
) {
  return await bcrypt.compare(newPassword, userPassword);
};
// to compare the time of password created and the time the token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    console.log(changedTimestamp, JWTTimestamp);
    // return true if the time the token was issued is less than the time the password was created or changed
    return JWTTimestamp < changedTimestamp;
  }
  // false means the password was not changed
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
