export default {
  mongoUrl: process.env.MONGO_URL,
  secret: process.env.JWT_SECRET || 'secret',
  port: process.env.PORT || 5050,
  iss: process.env.JWT_ISS || 'Issuer',
  exp: process.env.JWT_EXP || '1h',
  aud: process.env.JWT_AUD || 'https://issuer.com',
  serverUrl: process.env.SERVER_URL || 'http://localhost:5050',
  serverName: process.env.SERVER_NAME || 'Local server'
}
