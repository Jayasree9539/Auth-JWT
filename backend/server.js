import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

// ✅ Apply CORS FIRST, with config
app.use(cors({
  origin: 'http://localhost:5173',  // your frontend origin
  credentials: true                // allow cookies
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Then your routes
app.use('/api/users', userRoutes);

// ✅ Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(` Database Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
