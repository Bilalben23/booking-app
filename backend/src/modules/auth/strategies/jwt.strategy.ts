import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { PassportStatic } from 'passport';
import { ENV_VARS } from '@/config/env.ts';
import { UserService } from '@/modules/user/user.service.ts';
import { type JwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
    userId: string;
}

export const applyJwtStrategy = (passport: PassportStatic) => {
    passport.use(
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: ENV_VARS.JWT_ACCESS_SECRET,
            },
            async (payload: CustomJwtPayload, done) => {
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
