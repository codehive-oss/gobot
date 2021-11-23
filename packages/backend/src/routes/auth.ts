import { Router } from "express";
import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import { toGoUser } from "../db/entities/GoUser";
import { CLIENT_ID, CLIENT_SECRET } from "../utils/constants";

passport.serializeUser((id, done) => {
  done(null, id);
});

passport.deserializeUser(async (id, done) => {
  const user = await toGoUser(id as string);
  done(null, user);
});

export const router = Router();

passport.use(
  new DiscordStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      scope: ["identify", "guilds"],
      callbackURL: "/auth/callback",
    },
    async (accessToken, _refreshToken, profile, done) => {
      const goUser = await toGoUser(profile.id);
      if (goUser.accessToken !== accessToken) {
        goUser.accessToken = accessToken;
        goUser.save();
      }

      done(null, profile.id);
    }
  )
);

router.get("/", passport.authenticate("discord"));

router.get(
  "/callback",
  passport.authenticate("discord", { failureRedirect: "/" }),
  (_req, res) => {
    res.redirect("http://localhost:3000/dashboard");
  }
);
