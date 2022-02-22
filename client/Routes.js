import React, { useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { me } from "./store/user";

const Routes = () => {
  useEffect(() => {
    dispatch(me());
  }, []);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.user.id);
  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route path="/home" component={Home} />
          <Redirect to="/home" />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Redirect to="/" />
        </Switch>
      )}
    </div>
  );
};

export default Routes;
