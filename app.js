import passport from 'passport';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { passportConfig, corsOptions } from './config';
import { auth, comments, posts } from './routes';
import { getPagination, NotFoundError } from './utils';

mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
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
app.use(getPagination);

app.use(cors(corsOptions));
app.options('*', cors());

// unprotected routes
app.use('/auth', auth);

// semi-protected routes
app.use('/comments', comments);
app.use('/posts', posts);

// catch routes that don't exist
app.all('*', (req, res, next) => {
  next(new NotFoundError('Endpoint not found'));
});

// error handler
app.use((err, req, res, next) => {
  if (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
});

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
