export default {
  mongoUrl: process.env.MONGO_URL,
  port: process.env.PORT || 5050,
  secret: process.env.JWT_SECRET || 'secret',
  iss: process.env.JWT_ISS || 'Issuer',
  exp: process.env.JWT_EXP || '1h',
  aud: process.env.JWT_AUD || 'https://any.com'
}
