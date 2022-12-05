const baseUrl = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : 'http://localhost:3000'
const origin = process.env.REACT_APP_ORIGIN ? process.env.REACT_APP_ORIGIN  : 'http://localhost:3001'
// const origin = 'https://main.d28az3gs0u8gcy.amplifyapp.com/'
// const baseUrl = 'http://localhost:3001';
// const baseUrl = 'http://localhost:3002';
// const baseUrl = 'https://bigbrotherapi.herokuapp.com';

export {
  baseUrl,
  origin
};