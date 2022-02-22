import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "../store/user";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authenticate(username, password, "signup"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-element">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        />
      </div>
      <div className="form-element">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
