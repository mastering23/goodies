
require('dotenv').config({ path: './.env' });
const { Client } = require('pg');
// console.log('PGUSER:', process.env.PGUSER);  // Check if environment variables are loaded
// console.log('PGPASSWORD:', process.env.PGPASSWORD);  // Should log 'code'

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});



module.exports = client;

