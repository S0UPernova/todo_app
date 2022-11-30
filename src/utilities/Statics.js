require('dotenv').config();
const baseUrl = process.env.BASE_URL
const origin = process.env.ORIGIN
// const origin = 'https://main.d28az3gs0u8gcy.amplifyapp.com/'
// const baseUrl = 'http://localhost:3001';
// const baseUrl = 'http://localhost:3002';
// const baseUrl = 'https://bigbrotherapi.herokuapp.com';

export {
  baseUrl,
  origin
};