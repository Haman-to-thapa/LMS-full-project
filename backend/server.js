import express from 'express'
import dotenv from 'dotenv'
import connectDB from './server/database/db.js';
import userRoute from "./routes/userRoutes.js"
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config({})
// call database conncetion here 
connectDB()


const app = express();

// default middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin:"http://localhost:8080",
  credentials:true
}))


// apis endpoint
app.use("/api/v1/user",userRoute)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Listin at port ${PORT}`);
})