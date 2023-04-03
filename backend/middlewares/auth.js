const passport = require("passport");
const passwortJwt = require("passport-jwt");
const User = require("../models/userModel");
const ExtractJwt = passwortJwt.ExtractJwt;
const StrategyJwt = passwortJwt.Strategy;

const env = require("dotenv");
env.config();
passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwt_payload, done) => {
      try {
        const user = await User.findByPk(jwt_payload.id);
        return done(null, user);
      } catch (err) {
        console.log(req.user.id);
        // console.log(jwt_payload);
        return done(err);
      }
      // return done(null, user);
    }
  )
);
