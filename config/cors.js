const allowList = [
  /http:\/\/localhost:3000/,
  /https:\/\/zachyoung.dev/,
  /https:\/\/deploy-preview-\d+--zachatoo\.netlify\.app/,
];

export const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (!origin || allowList.some(allowedOrigin => allowedOrigin.test(origin))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}