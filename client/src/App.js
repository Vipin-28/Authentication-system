import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Verify from "./pages/verify/Verfiy";
import Profile from "./pages/profile/Profile";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";  // curr user context
import UpdateProfile from "./pages/updateProfile/UpdateProfile";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword"

function App() {
  const { user } = useContext(Context);// means curr user is signed 
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Profile /> : <Register />} />

        <Route path="/register" element={user ? <Profile /> : <Register />}/>
        <Route path="/login" element ={user ? <Profile /> : <Login />}/>

        <Route path="/verify" element={user ? <Verify /> : <Register />}/>
        <Route path="/me" element={user ? <Profile /> : <Login />}/> 

        <Route path="/update" element={user? <UpdateProfile/> : <Login />}/>
        <Route path="/forgetpassword" element= {<ForgetPassword/> } />
        <Route path="/resetpassword" element ={< ResetPassword />}/>

      </Routes> 
    </Router>
  );
}

export default App;
