import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/user";

const NavBar = () => {
  const isLoggedIn = useSelector((state) => !!state.user.id);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      <h1>App Template</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            <NavLink to="/">Home</NavLink>
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default NavBar;
