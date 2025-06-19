import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import router from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js'

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // or your frontend port
  credentials: true,
}));

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

