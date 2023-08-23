import cors from 'cors';
import express from 'express';
import globalErrorHandler from './app/middleWares/globalErrorHandler';
import { notFoundHandler } from './app/middleWares/notFoundHandler';
import router from './app/routes';
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello Cow Lover!');
});

app.use('/api/v1/', router);

app.use(globalErrorHandler);

app.use(notFoundHandler);

export default app;
