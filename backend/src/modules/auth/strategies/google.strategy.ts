import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { type PassportStatic } from "passport";
import { ENV_VARS } from "@/config/env.ts";
import { UserService } from "@/modules/user/user.service.ts";

const options = {
    clientID: ENV_VARS.GOOGLE_CLIENT_ID,
    clientSecret: ENV_VARS.GOOGLE_CLIENT_SECRET,
    callbackURL: ENV_VARS.GOOGLE_CALLBACK_URL
}

export const applyGoogleStrategy = (passport: PassportStatic) => {
    passport.use(
        new GoogleStrategy(options, async (accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await UserService.findUserByProviderId(profile.id);

                if (existingUser) {
                    return done(null, existingUser);
                }

                const newUser = await UserService.createUser({
                    name: profile.displayName,
                    email: profile.emails?.[0].value || "",
                    image: profile.photos?.[0].value || "",
                    provider: "google",
                    providerId: profile.id,
                    emailVerified: profile.emails?.[0]?.verified ?? true
                })
                return done(null, newUser);

            } catch (error) {
                return done(error, false);
            }
        })
    );
} 