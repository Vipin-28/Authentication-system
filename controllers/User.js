import { User } from "../models/users.js";
import { sendMail } from "../utils/sendMail.js";
import { sendToken } from "../utils/sendToken.js";

// register route
export const register = async (req, res) => {
  try {
    const { name, email, password, rollno, course, year, phno, gender} = req.body; 
    let user = await User.findOne({ email });//since email is unqiue 

    if (user) {// user already exists in our database
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const otp = Math.floor(Math.random() * 1000000);
     // creating user with 5 mins of otp expire
    user = await User.create({
      name,
      email,
      password,
      rollno, course, year, phno, gender,
      otp,
      otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000),
    });

    await sendMail(email, "Verify your account", `Your OTP is ${otp}`);

    sendToken(
      res,
      user,
      201,
      "OTP sent to your email, please verify your account"
    );
  } catch (error) {
    // 
    res.status(500).json({ success: false, message: error.message});
  }
};

// verify route
export const verify = async (req, res) => {
  try {
    let { id, otp} = req.body; 
    otp = Number(otp);
    //console.log(req.body);
    const user = await User.findById(id);// only be accessed when already logged in

    if (user.otp !== otp || user.otp_expiry < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid OTP or has been Expired" });
    }
    // otherwise otp is right
    user.verified = true;
    user.otp = null;
    user.otp_expiry = null;

    await user.save();
    // cookies mei store karne ke liye sendToken
    sendToken(res, user, 200, "Account Verified");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message});
  }
};

//login route
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });
    }

    const user = await User.findOne({ email }).select("+password");
    //console.log(user);

    if (!user) {//user already exist in our database
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    // comparing enterd password with already saved password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    sendToken(res, user, 200, "Login Successful");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//logout route
export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
      })
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// getMyProfile (/me) route
export const getMyProfile = async (req, res) => {
  try {
    // console.log(req.user);
    const user = await User.findById(req.user._id);

    sendToken(res, user, 201, `Welcome ${user.name} to your profile!!!`);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//profile update route
export const updateProfile = async (req, res) => {
  try {
    const { name, id } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });
    }
    const user = await User.findById(id);

    if (name) user.name = name;

    await user.save();//saving again after changes

    res
      .status(200)
      .json({ success: true, message: "Profile Updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// update password route
export const updatePassword = async (req, res) => {
  try {
    // seleting password since select field is false in schema
    const user = await User.findById(req.user._id).select("+password");

    const { oldPassword, newPassword } = req.body;
    //haven't done the confirm confirm password thing
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });
    }

    const isMatch = await user.comparePassword(oldPassword);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Old Password" });
    }

    user.password = newPassword;

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password Updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// forget password route
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });// email is unique

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    const otp = Math.floor(Math.random() * 1000000);

    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpiry = Date.now() + 10 * 60 * 1000; // 10 mins

    await user.save();

    const message = `Your OTP for reseting the password ${otp}. If you did not request for this, please ignore this email.`;

    await sendMail(email, "Request for Reseting Password", message);

    res.status(200).json({ success: true, message: `OTP sent to ${email}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// password reset route
export const resetPassword = async (req, res) => {
  try {
    const { otp, newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordOtp: otp,
      resetPasswordExpiry: { $gt: Date.now() },
    });
    // $gt is mongodb operator greater than 

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Otp Invalid or has been Expired" });
    }
    // otherwise user found
    user.password = newPassword;
    user.resetPasswordOtp = null;
    user.resetPasswordExpiry = null;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: `Password Changed Successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getTime = async ( req, res) =>{
    try{
        const user = await User.findById(req.user._id);

        const time = user.otp_expiry;
        res.send(200).json({success:true, message: time});

    }catch(err){
        res.status(500).json({success: false, message: error.message});
    }
}