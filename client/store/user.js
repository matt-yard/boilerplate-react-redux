import axios from "axios";

const SET_USER = "SET_USER";

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

export const me = () => async (dispatch) => {
  try {
    const { data: user } = await axios.get("/auth/me");
    return dispatch(setUser(user));
  } catch (error) {
    return dispatch(setUser({ error: error }));
  }
};

export const authenticate = (username, password, formName) => {
  return async (dispatch) => {
    try {
      if (formName === "login") {
        await axios.post("/auth/login", { username, password });
      } else {
        await axios.post("/auth/signup", { username, password });
      }
      dispatch(me());
    } catch (error) {
      return dispatch(setUser({ error: error }));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await axios.delete("/auth");
      return dispatch(setUser({}));
    } catch (error) {
      return dispatch(setUser({ error: error }));
    }
  };
};

const initState = {};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};
