import "./profile.css";
import {Link} from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";


export default function Profile() {
  const logoutHandle = ()=>{
    localStorage.clear();
    window.location.replace("/login");
  }
  const updateHandle = ()=>{
    window.location.replace("/update");
  }
  const { user } = useContext(Context); // user for details and dispatch for update route
  console.log(user);
  return (
    <div className = "profileMain">
      <div className="card">
          <img src="https://i.pinimg.com/originals/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg" width="150" height="200" ></img>
          <h4 className="text">{user.user.rollno}</h4>
          <h3 className="text">{user.user.name}</h3>
          <p className="text">{user.user.email}</p>
          <p className="text">{user.user.course}  {user.user.year}th year</p>
          <p className="text">{user.user.phno}</p>
          <p className="text">{user.user.gender}</p>
          {(user.user.verified)? 
            ( 
              <div>
                <h5 className="text">verified account</h5> 
                <button className="updateBtn" onClick={updateHandle}> Update </button>
              </div>
            ): 
              <div>

                <div className="link">
                  {(user.user.verified)?null:alert("verify yourself")}
                  <Link  to="/verify" className ="verifybtn">
                      Click here to verify
                  </Link>
                </div>
              </div>
          }
      </div>
      <div>
      
        <div className="logout">
            <button className="logoutBtn" onClick={logoutHandle}>Logout</button>
        </div>
      </div>
    </div>
  )
}
