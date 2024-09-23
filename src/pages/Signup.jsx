import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import bike1 from "../assests/bike2.png"


function Signup(props) {
  const navigate = useNavigate();
  const userList=props.userList
  const setUserList = props.setUserList;

  const [euser, seteuser] = useState("");
  const [epass, setepass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  // Regular expressions for validation
  const nameRegex = /^[a-zA-Z]+$/;
  const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;
  const passwordRegex = /^[a-zA-Z0-9]+$/;

  // Handler functions
  const handleuser = (evt) => seteuser(evt.target.value);
  const handlepass = (evt) => setepass(evt.target.value);
  const handleconfirmpass = (evt) => setConfirmPass(evt.target.value);
  const handleEmail = (evt) => setEmail(evt.target.value);
  const handlePhoneNumber = (evt) => setPhoneNumber(evt.target.value);
  const handleRole = (evt) => setRole(evt.target.value);

  // Validation logic
  const validateForm = () => {
    const newErrors = {
      username: !nameRegex.test(euser),
      email: !emailRegex.test(email),
      password: !passwordRegex.test(epass),
      confirmPassword: epass !== confirmPass,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error === true);
  };

  // Submission logic
  const addcheckuser = () => {
    if (validateForm()) {
      axios.post("http://localhost:3001/User/signUp", {
        userName: euser,
        emailId: email,
        password: epass,
        confirmPassword: confirmPass,
        phoneNumber: phoneNumber,
      })
      .then((data) => {
        console.log("User signed up successfully:", data.data);
        setUserList([{ userName: euser, emailId: email, password: epass, confirmPassword: confirmPass, phoneNumber: phoneNumber }]);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing up the user:", error);
      });
    }
  };

  return (
    <div className="bg-[#f8f9ff] h-screen flex justify-center items-center">
      <div className="w-[350px] h-[550px] p-5 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center relative">
        <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2">
          <img src={bike1} alt="Logo" className="w-[90px] h-[80px]" />
        </div>
        <h1 className="font-thin text-[#1d1f2a] text-shadow-md font-montserrat tracking-wide text-2xl py-5">
          WELCOME
        </h1>
        <div className="flex flex-col w-full gap-2 my-2">
          <input
            type="text"
            className="border rounded-md border-gray-300 p-2 w-full"
            placeholder="Username"
            onChange={handleuser}
            value={euser}
          />
          {errors.username && <span className="text-red-500">Invalid username</span>}

          <input
            type="text"
            className="border rounded-md border-gray-300 p-2 w-full"
            placeholder="Email"
            onChange={handleEmail}
            value={email}
          />
          {errors.email && <span className="text-red-500">Invalid email</span>}

          <input
            type="password"
            className="border rounded-md border-gray-300 p-2 w-full"
            placeholder="Password"
            onChange={handlepass}
            value={epass}
          />
          {errors.password && <span className="text-red-500">Invalid password</span>}

          <input
            type="password"
            className="border rounded-md border-gray-300 p-2 w-full"
            placeholder="Confirm Password"
            onChange={handleconfirmpass}
            value={confirmPass}
          />
          {errors.confirmPassword && <span className="text-red-500">Passwords do not match</span>}

          <input
            type="text"
            className="border rounded-md border-gray-300 p-2 w-full"
            placeholder="Phone Number"
            onChange={handlePhoneNumber}
            value={phoneNumber}
          />

          <input
            type="text"
            className="border rounded-md border-gray-300 p-2 w-full"
            placeholder="Role"
            onChange={handleRole}
            value={role}
          />

          <button
            className="w-full bg-[#1d1f2a] text-white rounded-md p-2 mt-2 cursor-pointer transition ease-in-out duration-300 hover:bg-[#333]"
            onClick={addcheckuser}
          >
            Signup
          </button>
        </div>
        <p className="mt-4">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
