import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
    </div>
  );
};

export default Home;
