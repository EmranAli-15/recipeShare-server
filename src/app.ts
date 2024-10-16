import express, { Request, Response } from 'express';
import cors from 'cors';
import { authRoutes } from './app/modules/auth/auth.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { recipeRoutes } from './app/modules/recipe/recipe.route';
export const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',  // The address of your client
  credentials: true
}));



// -----ROUTES START----- //
app.use('/api', authRoutes);
app.use('/api', recipeRoutes);

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