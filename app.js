import { passportConfig, hash } from './config/passport.js';
import passport from 'passport';
import express from 'express';
import mongoose from 'mongoose';
import auth from './routes/auth.js';
import { UserModel } from './models/user.js';

mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json());
app.use(passport.initialize());
passportConfig();

// Routes
app.use('/auth', auth);

app.post('/init', (req, res) => {
  res.send('No longer in use');
  const { email, password } = req.body;

  hash(password, 10).then(hashedPassword => {
    UserModel.create({ email, password: hashedPassword }, (err, message) => {
      if (err) {
        res.send(err);
      }
      res.send(message);
    })
  }).catch(err => {
    console.log(err);
  });
});

app.listen(5000, () => console.log('Server started on port 5000'));