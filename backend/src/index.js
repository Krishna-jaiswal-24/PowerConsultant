import express from 'express';
import 'dotenv/config';
import connectDb from "./db/index.js";
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

connectDb()
  .then(async () => app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  }))
  .catch((error) => {
    console.log("MONGO DB connection FAILED", error);
  });

import AdminRouter from "./routes/adminRoute.js";
import UserRouter from "./routes/userRoute.js";

app.use('/api/admin', AdminRouter);
app.use('/api/user', UserRouter);

export default app;
