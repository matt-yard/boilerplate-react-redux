const usersRouter = require("express").Router();
const {
  models: { User },
} = require("../db");

//mounted on /api/users
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
