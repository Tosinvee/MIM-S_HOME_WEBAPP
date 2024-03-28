const User = require("../models/usersModel");
const catchAsync = require("../utils/catchAsync");

const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(
    ({ name, email, password, passwordConfirm } = req.body)
  );
  res.status(200).json({
    status: "sucess",
    data: {
      user: newUser,
    },
  });
});
module.exports = {signUp}