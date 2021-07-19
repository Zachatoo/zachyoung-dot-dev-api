import { Router } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import passport from 'passport';
import { BadRequestError } from '../utils';

const router = Router();

router.post('/token', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return next(new BadRequestError(info));
    }

    req.logIn(user, { session: false }, err => {
      if (err) {
        return next(new Error(err));
      }

      jsonwebtoken.sign({ userID: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' }, (err, accessToken) => {
        if (err) {
          return next(new Error(err));
        }
        res.json({ accessToken });
      });
    });
  })(req, res, next);
});

export default router;
