import axios from "axios";
import { useRef, useState} from "react";
import "./updateProfile.css";

export default function UpdateProfile() {
  const nameRef = useRef(); 
  const yearRef = useRef();
  const phnoRef = useRef();
  const [error, setError] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  

  const url = "http://localhost:4500/api/v1";

  function updateandsave(newName, newYear, newPhno){
    let allRecords = JSON.parse(window.localStorage.getItem("user"));
    localStorage.clear();
    console.log(allRecords);
    console.log("allRecords.user.name = ", allRecords.user.name);
    allRecords.user.name = newName;
    allRecords.user.year = newYear;
    allRecords.user.phno = newPhno;
    console.log("allRecords.user.name = ", allRecords.user.name);
    window.localStorage.setItem("user", JSON.stringify((allRecords)))
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      //console.log(user.user._id, typeof(user.user._id));
      await axios.put(`${url}/updateprofile`, {
        id: user.user._id,
        name: nameRef.current.value,
        year: yearRef.current.value,
        phno: phnoRef.current.value
      });

      updateandsave(nameRef.current.value,
        yearRef.current.value,
        phnoRef.current.value);
      window.location.replace("/me"); 
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  }
  return (
    <div className="updateProfile">
      <span className="Title">Update your user details.</span>
      <form className="Form" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="verifyInput"
          placeholder="Enter New Username"
          ref={nameRef}
        />
        <label>Year</label>
        <input
          type="text"
          className="verifyInput"
          ref={yearRef}
        />
        <label>Phone no.</label>
        <input
          type="text"
          className="verifyInput"
          ref={phnoRef}
        />
        <button className="updateButton" type="submit">
          Update
        </button>
      </form>

      {error && <span style={{color:"red", marginTop:"10px"}}>{error}</span>}
    </div>
  );
}