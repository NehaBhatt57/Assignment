import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;

          let user = await User.findOne({ email });

          if (user) {
            if (!user.googleId) {
              user.googleId = profile.id;
              await user.save();
              console.log("Linked Google account to existing user:", user);
            } else {
              console.log("Google user exists:", user);
            }
          } else {
            user = await User.create({
              googleId: profile.id,
              name: profile.displayName,
              email,
            });
          }
          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
}

export default passport;







































// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import User from "../models/User.js";

// import dotenv from "dotenv";

// dotenv.config();

// console.log("Inside passport.js Google Client ID:", process.env.GOOGLE_CLIENT_ID);

// if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "/api/auth/google/callback",
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         try {
//           let user = await User.findOne({ googleId: profile.id });
//           if (!user) {
//             user = await User.create({
//               googleId: profile.id,
//               name: profile.displayName,
//               email: profile.emails[0].value,
//             });
//           }
//           return done(null, user);
//         } catch (err) {
//           return done(err, null);
//         }
//       }
//     )
//   );
// }


// export default passport;