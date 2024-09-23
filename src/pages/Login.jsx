import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import bike1 from "../assests/bike2.png"

function Login(props) {
  const navigate = useNavigate();

  const setUserList=props.setUserList
  const [tuser, settuser] = useState("");
  const [tpass, settpass] = useState("");
  const [temail, settemail] = useState("");
  const [ruser, setruser] = useState(true);

  
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const nameRegex = /^[a-zA-Z]+$/;
  const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;
  const passwordRegex = /^[a-zA-Z0-9]+$/;



  // useEffect(() => {
    
  // }, []);

  const handleuser = (evt) => {
    settuser(evt.target.value);
  };

  const handlepass = (evt) => {
    settpass(evt.target.value);
  };

  const handleEmail = (evt) => {
    settemail(evt.target.value);
  };

  const validateForm = () => {
    let valid = true;

    if (!nameRegex.test(tuser)) {
      setUsernameError("Invalid username. Only letters are allowed.");
      valid = false;
    } else {
      setUsernameError("");
    }

    if (!emailRegex.test(temail)) {
      setEmailError("Invalid email format. Please use a valid Gmail address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!passwordRegex.test(tpass)) {
      setPasswordError("Invalid password. Only alphanumeric characters are allowed.");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };


  
  const handlelogin = () => {
    // console.log("before Valid")
    if (true) {
      console.log("After")
     axios.post("http://localhost:3001/User/login",{
      _id:"",
      password:tpass,
      emailId:temail
     })
         
        .then((response) => {
          const userData = response.data.user;
         console.log(response.data)
         localStorage.setItem("userId", userData._id);

          
          if (
            userData._id===response.data.user._id,
            userData.userName===tuser,
            userData.password === tpass &&
            userData.emailId === temail
          ) { 
            console.log("Login Successful");
            setUserList({
              _id: userData._id, 
              userName: userData.userName,
              password: tpass,
              emailId: temail,
              confirmPassword: userData.confirmPassword,
              phoneNumber: userData.phoneNumber,
            });
            navigate("/home",{state:{userName:tuser}});
          } else {
            console.log("Login Failed");
            setruser(false);
          }
        })
        .catch
        ((error) => {
          console.error("Error fetching user data:", error);
          setruser(false);
        });
    }
  };

  return (
    <div style={{ backgroundColor: "#f8f9ff", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: "300px", height: "400px", padding: "20px", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transition: "box-shadow 0.3s ease", position: "relative" }}>
        <div style={{ position: "absolute", top: "-30px", left: "50%", transform: "translateX(-50%)" }}>
          <img src={bike1} alt="Logo" style={{ width: "90px", height: "80px" }} />
        </div>
        <h1 style={{ fontWeight: "thin", color: "#1d1f2a", textShadow: "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)", fontFamily: "'Montserrat', sans-serif", letterSpacing: "2px", padding: "30px 0", fontSize: "32px" }}>WELCOME</h1>
        {ruser ? (
          <p style={{ padding: "5px", marginTop: "8px" }}></p>
        ) : (
          <p style={{ color: "#091644", position: "relative", top: "-30px" }}>Please sign up before you log in :)</p>
        )}
        <div style={{ display: "flex", flexDirection: "column", width: "90%", gap: "10px", marginTop: "10px" }}>
          <input
            type="text"
            style={{ width: "110%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px", position: "relative", right: "10px", top: "-40px" }}
            placeholder="Email"
            value={temail}
            onChange={handleEmail}
          />
          {emailError && <span style={{ color: "red", position: "relative", top: "-40px" }}>{emailError}</span>}
          <input
            type="password"
            style={{ width: "110%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px", position: "relative", right: "10px", top: "-40px" }}
            placeholder="Password"
            value={tpass}
            onChange={handlepass}
          />
          {passwordError && <span style={{ color: "red", position: "relative", top: "-40px" }}>{passwordError}</span>}
          <button style={{ padding: "10px", backgroundColor: "#1d1f2a", color: "#fff", border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer", transition: "background-color 0.3s ease", position: "relative", top: "-35px" }} onClick={handlelogin}>
            LOGIN
          </button>
        </div>
        <p style={{ position: "relative", top: "-11px" }}>
          Don't have an account? <Link to={"/signup"}>Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;