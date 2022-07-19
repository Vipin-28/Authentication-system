import axios from "axios";
import { useRef, useState} from "react";
import "./verify.css";

export default function Login() {
  const otpRef = useRef(); 
  const [error, setError] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  

  const url = "http://localhost:4500/api/v1";
  function updateandsave(){
    let allRecords = JSON.parse(window.localStorage.getItem("user"));
    localStorage.clear();
    console.log(allRecords);
    console.log("allRecords.user.verified = ", allRecords.user.verified);
    allRecords.user.verified = true;
    console.log("allRecords.user.verified = ", allRecords.user.verified);
    window.localStorage.setItem("user", JSON.stringify((allRecords)))
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      //console.log(user.user._id, typeof(user.user._id));
      await axios.post(`${url}/verify`, {
        id: user.user._id,
        otp: otpRef.current.value
      });

      updateandsave();
      window.location.replace("/me"); 
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  }
  return (
    <div className="verify">
      <span className="verifyTitle">OTP have been sent to your mail.</span>
      <form className="verifyForm" onSubmit={handleSubmit}>
        <label>OTP</label>
        <input
          type="text"
          className="verifyInput"
          placeholder="Enter OTP"
          ref={otpRef}
        />
        <button className="verifyButton" type="submit">
          Verify
        </button>
      </form>

      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </div>
  );
}