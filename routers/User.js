import express from "express";
import {
  forgetPassword,
  getMyProfile,
  getTime,
  login,
  logout,
  register,
  resetPassword,
  updateProfile,
  verify,
} from "../controllers/User.js";


const router = express.Router();

router.route("/register").post(register);

router.route("/verify").post(verify);

router.route("/login").post(login);
router.route("/logout").get(logout);

router.route("/me").get(getMyProfile);


 // since we are updating so put
router.route("/updateprofile").put(updateProfile);

router.route("/forgetpassword").post(forgetPassword);
router.route("/resetpassword").put(resetPassword);

router.route("/gettime").get(getTime);

export default router;
