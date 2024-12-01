/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFoundError';
const app: Application = express();


// parsers
app.use(express.json());
app.use(cors());

// application
app.use('/api',router);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// middleware
// eslint-disable-next-line @typescript-eslint/no-explicit-any, 
app.use(globalErrorHandler);
// not found route
app.use(notFound);
export default app;
