import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy } from 'passport-jwt';
import ExtractJWT from 'passport-jwt/lib/extract_jwt';
import bcryptjs from 'bcryptjs';
import { UserModel } from '../models/user';

export const passportConfig = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, callback) => {
    return UserModel.findOne({ email })
      .then(user => {
        if (!user) {
          return callback(null, false, 'Incorrect email or password');
        }
  
        bcryptjs.compare(password, user.password, (err, res) => {
          if (res) {
            return callback(null, user);
          } else {
            return callback(null, false, 'Incorrect password');
          }
        });
      })
      .catch(err => callback(err));
  }));
  
  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  }, (jwtPayload, next) => {
    return UserModel.findOneById(jwtPayload.id)
      .then(user => {
        return next(null, user);
      })
      .catch(err => next(err));
  }));
}

export const hash = async (text, size) => {
  try {
    const salt = await bcryptjs.genSalt(size);
    const hash = await bcryptjs.hash(text, salt);
    return hash;
  } catch (err) {
    return err;
  }
}