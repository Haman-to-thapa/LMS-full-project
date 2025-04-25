import express from 'express'
import dotenv from 'dotenv'
import connectDB from './server/database/db.js';
import userRoute from "./routes/userRoutes.js"
import cookieParser from 'cookie-parser';
import cors from 'cors'
import courseRoute from './routes/courseRoute.js'
import mediaRoute from './routes/mediaRoute.js'
import purchaseRoute from './routes/purchaseCourseRoutes.js'

dotenv.config({})
// call database conncetion here
connectDB()


const app = express();

// default middleware
app.use(express.json());
app.use(cookieParser())
// Configure CORS with allowed origins from environment variable or defaults
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'https://your-netlify-app.netlify.app'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));



// apis endpoint
app.use("/api/v1/user",userRoute)
app.use('/api/v1/course', courseRoute)
app.use('/api/v1/media',mediaRoute)
app.use('/api/v1/purchase',purchaseRoute)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Listin at port ${PORT}`);
})