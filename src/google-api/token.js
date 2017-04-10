module.exports = {
  access_token: process.env.GOOGLE_ACCESS_TOKEN,
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  token_type: 'Bearer',
  expiry_date: process.env.GOOGLE_TOKEN_EXPIRY_DATE,
};
