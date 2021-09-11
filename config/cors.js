const allowList = [
  'http://localhost:3000',
  'https://zachyoung.dev',
  'https://app.netlify.com',
];

export const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (allowList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}