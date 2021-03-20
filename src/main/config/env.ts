export default {
  mongoUrl: process.env.MONGO_URL,
  port: process.env.PORT || 5050,
  secret: process.env.JWT_SECRET || 'j6HZScwueTrDd78JYhSn2cJrGauF9csdMbgP6mVFp2YfvAnnqRWHKyns2LwNrJNjDJVBRkQVDauAWPrVur2QPNwjF22FnGGD9b4L5j7DvpWYYBTrqCpwBnYxGaD3WgRp',
  iss: process.env.JWT_ISS || 'Nucleale',
  exp: process.env.JWT_EXP || '1h',
  aud: process.env.JWT_AUD || 'https://nucleale.com'
}
