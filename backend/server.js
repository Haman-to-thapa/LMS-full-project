import express from 'express'
import dotenv from 'dotenv'
import connectDB from './server/database/db.js';

dotenv.config({})
// call database conncetion here 
connectDB


const app = express();


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Listin at port ${PORT}`);
})