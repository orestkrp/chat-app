export default () => ({
  database: {
    uri: process.env.MONGODB_URI,
  },
  jwt: {
    secret: process.env.SECRET,
    expiresIn: '1m',
  },
});
