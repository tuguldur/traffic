const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");
const check = require("../middleware/check");
const passport = require("passport");

router.get("/", check, auth.index);

router.get("/facebook", passport.authorize("facebook", { scope: ["email"] }));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook"),
  auth.facebook
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
    failureRedirect:
      process.env.NODE_ENV === "development"
        ? `http://localhost:${process.env.CLIENT_PORT}/auth`
        : "/auth",
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect:
      process.env.NODE_ENV === "development"
        ? `http://localhost:${process.env.CLIENT_PORT}/auth`
        : "/auth",
  }),
  auth.google
);

router.get("/logout", function (req, res) {
  req.logout();
  return res.json({ status: true });
});
module.exports = router;
