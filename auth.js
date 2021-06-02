// passportjs configs
const User = require("./app/models/user");
const passport = require("passport"),
  FacebookStrategy = require("passport-facebook").Strategy,
  GoogleStrategy = require("passport-google-oauth20").Strategy;
//
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch(() => done(new Error("Failed to deserialize an user")));
});
// The function that is called when an OAuth provider sends back user
// information.  Normally, you would save the user to the database here
// in a callback that was customized for each provider.
const callback = (accessToken, refreshToken, profile, next) => {
  const { provider } = profile;
  User.findOne({ [provider]: profile.id }, (err, user) => {
    if (err) return next(err);
    if (user === null)
      User.create({
        name: profile.displayName,
        [provider]: profile.id,
        role:
          provider === "google" &&
          profile._json.email === process.env.ROOT_EMAIL
            ? "admin"
            : "user",
        avatar:
          provider === "facebook"
            ? `https://graph.facebook.com/${profile.id}/picture?type=normal`
            : profile.photos[0].value,
      })
        .then((user) => next(null, user))
        .catch((err) => next(err));
    else next(null, user);
  });
};
// Adding each OAuth provider's strategy to passport
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/rest/auth/google/callback",
      proxy: true,
    },
    callback
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${
        process.env.NODE_ENV === "development"
          ? "https://localhost:5000"
          : process.env.URL
      }/rest/auth/facebook/callback`,
      profileFields: ["id", "displayName"],
      proxy: true,
    },
    callback
  )
);
