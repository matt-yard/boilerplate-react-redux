import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h1>Hello {user.username}</h1>
    </div>
  );
};

export default Home;
