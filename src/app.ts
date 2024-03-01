import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import swaggerUi from "swagger-ui-express";
import cors from 'cors';
import Router from './routes';
import CustomError from './helpers/CustomError';
import { User } from './types/interfaces/User.interface';

declare module 'express' {
  interface Request {
    user?: User;
  }
}
const app: Application = express();
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));

app.use("/api/docs", swaggerUi.serve, async (_req: Request, res: Response) => {
  return res.send(
    swaggerUi.generateHTML(await import("../build/swagger.json"))
  );
});

app.use('/api', Router);

app.use((err: CustomError, req: Request, res: Response, _next: NextFunction) =>
  res
    .status(err.statuscode || 500)
    .json({ error: err.message || '' }),
);

export default app;
