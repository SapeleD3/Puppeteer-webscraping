export default () => ({
  appEnv: process.env.APP_ENV,
  dbUrl: process.env.MONGO_DB_URL,
  port: process.env.PORT,
});
