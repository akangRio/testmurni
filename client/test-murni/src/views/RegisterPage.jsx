import axios from "axios";
import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const Username = useRef("");
  const Password = useRef("");
  const ConfirmPassword = useRef("");
  const Age = useRef("");
  const navigate = useNavigate;

  const register = async () => {
    try {
      const response =
        Password.current.value === ConfirmPassword.current.value
          ? await axios.post("http://localhost:3000/register", {
              Username: Username.current.value,
              Password: Password.current.value,
              Age: Age.current.value,
            })
          : null;
      alert(response.data.message);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <>
      <h1>Register Page</h1>
      <div className="flex flex-col">
        <label htmlFor="">Username</label>
        <input type="text" ref={Username} />
        <label htmlFor="">Password</label>
        <input type="password" ref={Password} />
        <label htmlFor="">Confirm Password</label>
        <input type="password" ref={ConfirmPassword} />
        <label htmlFor="">Age</label>
        <input type="number" ref={Age} />

        <button onClick={register}>Register</button>
        <NavLink to={"/"}>
          <button>Back To Login</button>
        </NavLink>
      </div>
    </>
  );
};
