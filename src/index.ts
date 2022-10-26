import express from 'express';
import { cors, errorHandler } from './app/middlewares';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(3100, () => console.log('Started'));
