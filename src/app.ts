import cors from 'cors';
import express from 'express';
import globalErrorHandler from './app/middleWares/globalError';
import { notFoundHandler } from './app/middleWares/notFound';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to DB Data Harbor');
});

// app.use('/api/v1/', router);

app.use(globalErrorHandler);

app.use(notFoundHandler);

export default app;
