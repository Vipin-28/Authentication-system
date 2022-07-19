import axios from "axios";
import {Link} from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const emailRef = useRef();         // to get reference of the email input dom object
  const passwordRef = useRef();     // to get referecne of the password input dom object
  const {user, dispatch, isFetching } = useContext(Context);      // sending 2 props 
  const [error, setError] = useState(false);

  const url = "http://localhost:4500/api/v1";

  const handleSubmit = async (e) => { // on submission of the login form
    e.preventDefault();               // prevent webpage to get refresh
    dispatch({ type: "LOGIN_START" });// start login on form submission
    try {
      const res = await axios.post(`${url}/login`, {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });  
      if(user) window.location.replace("/login");
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your email..."
          ref={emailRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <div className="forgetpass"> 
          <Link to="/forgetpassword" className="link">
            forgot password?
          </Link>
        </div>

        <button className="loginButton" type="submit" disabled={isFetching} >  
          Login
        </button>

        <p className="pcen">or</p>
        <div className="loginRegisterButton">
        <button >
            <Link className="link" to="/register">
            Register
            </Link>
        </button>
        <p>Don't have an account!</p>
      </div>
      </form>
      
      {error && <span style={{color:"red", marginTop:"10px"}}>{error}</span>}
    </div>
  );
}