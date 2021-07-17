import { Router } from 'express';
const router = Router();
import jsonwebtoken from 'jsonwebtoken';
import passport from 'passport';

router.post('/token', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info,
        user,
      });
    }

    req.logIn(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }

      jsonwebtoken.sign(user, process.env.JWT_SECRET, { expiresIn: '30s' }, (err, token) => {
        res.json({ token, err, user });
      });
      // const token = jsonwebtoken.sign(user, process.env.JWT_SECRET);
      // res.json({ user, token })
    });
  })(req, res);
});

export default router;