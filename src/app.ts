import express, { Request, Response } from 'express';
import cors from 'cors';
import { authRoutes } from './app/modules/auth/auth.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
export const app = express();

app.use(express.json());
app.use(cors());




// -----ROUTES START----- //
app.use('/api', authRoutes);

// -----ROUTES END----- //




app.get('/', (req, res) => {
  res.send('Hello World!')
});



app.use((req: Request, res: Response, next) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Not Found",
  })
});

app.use(globalErrorHandler);