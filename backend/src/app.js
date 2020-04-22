import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

const app = express();
mongoose.connect(
  'mongodb+srv://sinergia:sinergia123@cluster0-eeirc.mongodb.net/sinergia?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(express.json());
app.use(routes);

export default app;
