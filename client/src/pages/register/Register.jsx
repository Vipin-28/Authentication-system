import { Link } from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import "./register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rollno, setRollno] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [phno, setPhno] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState(false);

  const url = "http://localhost:4500/api/v1";
  const handleSubmit = async(e) =>{
    e.preventDefault(); // stop from getting refreshed!
    setError(false);
    try {
      const res = await axios.post(`${url}/register`, {
        name,
        email,
        password,
        rollno, course, year, phno, gender
      });
      res.data && window.location.replace("/login");   // curr window replaced by verify page
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  }

  return (
    <div className="register">
      <span className="registerTitle">Register</span>

      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          onChange={(e) => setName(e.target.value)}
        />
        <label>Roll No.</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your rollno..."
          onChange={(e) => setRollno(e.target.value)}
        />
        <label>Course</label>
        <input
          type="text"
          className="registerInput"
          onChange={(e) => setCourse(e.target.value)}
        />
        <label>Year</label>
        <input
          type="text"
          className="registerInput"
          onChange={(e) => setYear(e.target.value)}
        />
        <label>Phone no.</label>
        <input
          type="text"
          className="registerInput"
          onChange={(e) => setPhno(e.target.value)}
        />
        <lable>Gender</lable>
        <input
          type="text"
          className="registerInput"
          onChange={(e) => setGender(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Atleast 8 characters..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
        <div className="registerLoginButton">


        <p className="pcen">or</p>
        <button>
            <Link className="link" to="/login">
            Login
            </Link>
        </button>
        <p>Already have an account!</p>
      </div>
      </form>
      
      {error && <span style={{color:"red", marginTop:"10px"}}>{error}</span>}
    </div>
  );
}