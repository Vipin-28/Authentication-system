export const sendToken = (res, user, statusCode, message) => {
  const token = user.getJWTToken();

  const options = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };
  // since we don't want to send password and otp as response!!!
  const userData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    rollno: user.rollno,
    course: user.course,
    year: user.year,
    phno: user.phno,
    gender: user.gender,
    verified: user.verified,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, message, user: userData });
};
