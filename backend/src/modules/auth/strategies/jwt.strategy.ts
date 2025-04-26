import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { type PassportStatic } from 'passport';
import { ENV_VARS } from '@/config/env.ts';
import { UserService } from '@/modules/user/user.service.ts';
import { type JwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
    userId: string;
}

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: ENV_VARS.JWT_ACCESS_SECRET,
}

export const applyJwtStrategy = (passport: PassportStatic) => {
    passport.use(
        new JwtStrategy(options, async (payload: CustomJwtPayload, done) => {
            try {
                const user = await UserService.getUserById(payload.userId);
                if (!user) return done(null, false);
                return done(null, user);
            } catch (error) {
                return done(error, false);
            }
        }
        )
    );
};
