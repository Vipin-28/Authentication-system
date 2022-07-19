import axios from "axios";
import { useRef, useState } from "react";
import "./forgetPassword.css";

export default function ForgetPassword() {
  const emailRef = useRef();         // to get reference of the email input dom object
  const [error, setError] = useState(false);

  const url = "http://localhost:4500/api/v1";

  const handleSubmit = async (e) => { // on submission of the login form
    e.preventDefault();               // prevent webpage to get refresh
    try {
        await axios.post(`${url}/forgetpassword`, {
            email: emailRef.current.value,
      });

      window.location.replace("/resetpassword");
    } catch (err) {
        console.log(err);
        setError(err.response.data.message);
    }
  };

  return (
    <div className="forgetPassword">
      <span className="Title">Forgot Password</span>
      <form className="Form" onSubmit={handleSubmit}>
        <label>Enter your registered email</label>
        <input
          type="text"
          className="emailInput"
          placeholder="Enter your email..."
          ref={emailRef}
        />

        <button className="submitButton" type="submit" >  
          Send OTP
        </button>
      </form>

        {error && <span style={{color:"red", marginTop:"10px"}}>{error}</span>}      
    </div>

  );
}
