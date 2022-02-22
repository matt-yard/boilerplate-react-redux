const cookieParser = require("cookie-parser");
const authRouter = require("express").Router();
const {
  models: { User },
} = require("../db");

authRouter.use(cookieParser(process.env.COOKIE_SECRET));

const requireToken = async (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    const user = await User.findByToken(token);
    req.user = {
      id: user.id,
      username: user.username,
    };
    next();
  } catch (err) {
    next(err);
  }
};

authRouter.post("/login", async (req, res, next) => {
  try {
    const token = await User.authenticate(req.body);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      //secure: true, //this requires HTTPS on the url to transmit the cookie, in production we want this set to true
      signed: true,
    });
    res.send();
  } catch (err) {
    next(err);
  }
});

authRouter.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = await user.generateToken();
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      // secure: true, //uncomment for production code
      signed: true,
    });
    res.send();
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

authRouter.get("/me", requireToken, async (req, res, next) => {
  try {
    if (req.user) {
      res.send(req.user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

authRouter.delete("/", requireToken, async (req, res, next) => {
  res.clearCookie("token", {
    sameSite: "strict",
    signed: true,
    httpOnly: true,
  });
  res.send();
});

module.exports = authRouter;
