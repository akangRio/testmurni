import { useRef } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export const LoginPage = () => {
  const Username = useRef("");
  const Password = useRef("");
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        Username: Username.current.value,
        Password: Password.current.value,
      });
      alert("Login Success", response.data.access_token);
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  return (
    <>
      <h1>Login Page</h1>
      <div className="flex flex-col">
        <label htmlFor="">Username</label>
        <input type="text" ref={Username} />
        <label htmlFor="">Password</label>
        <input type="password" ref={Password} />
        <button onClick={handleLogin}>Login</button>
      </div>
      <NavLink to={"/register"}>
        <button>Register</button>
      </NavLink>
      <NavLink to={"/data"}>
        <button>View Data</button>
      </NavLink>
    </>
  );
};
