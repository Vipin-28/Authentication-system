import axios from "axios";
import { useRef, useState} from "react";
import "./resetPassword.css";

export default function Login() {
  const otpRef = useRef(); 
  const newPasswordRef = useRef();
  const [error, setError] = useState(false);
  

  const url = "http://localhost:4500/api/v1";
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      //console.log(user.user._id, typeof(user.user._id));
      await axios.put(`${url}/resetpassword`, {
        otp: otpRef.current.value,
        newPassword : newPasswordRef.current.value
      });
      alert("Password Changed Successfully");
      window.location.replace("/login"); 
    } catch (err) {
      setError(err.response.data.message);
    }
  }
  return (
    <div className="resetPassword">
      <span className="Title">Password reset otp have been sent to your mail.</span>
      <form className="Form" onSubmit={handleSubmit}>
        <label>OTP</label>
        <input
          type="text"
          className="verifyInput"
          placeholder="Enter OTP"
          ref={otpRef}
        />
        <label>New Password</label>
        <input
          type="text"
          className="verifyInput"
          placeholder="Enter your new Password"
          ref={newPasswordRef}
        />
        <button className="resetButton" type="submit">
           Reset
        </button>
      </form>

      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </div>
  );
}