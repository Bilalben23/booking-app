import { applyGoogleStrategy } from "@/modules/auth/strategies/google.strategy.ts";
import { applyJwtStrategy } from "@/modules/auth/strategies/jwt.strategy.ts";
import passport from "passport";

applyJwtStrategy(passport);
applyGoogleStrategy(passport);

// applyFacebookStrategy(passport);
// applyAppleStrategy(passport);

export default passport;