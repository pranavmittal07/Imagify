import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import router from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js'

const PORT = process.env.PORT || 5000;
const app = express();

const allowedOrigins = [
  'http://localhost:5173',               // for local dev
  'https://imagify-1qlx.onrender.com'    // your deployed frontend
];

app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}))

app.get('/', (req, res) => {
  res.send('API Working!');
});

app.use('/api', router);
app.use('/api/users', router);
app.use('/api/images', imageRouter); 

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
  }
};

startServer();

