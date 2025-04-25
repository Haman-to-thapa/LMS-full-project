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
  : ['http://localhost:5173', 'http://localhost:3000'];

// For production, you should set ALLOWED_ORIGINS environment variable
// with your frontend domain(s)
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
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