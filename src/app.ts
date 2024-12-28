import express, { Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cors from 'cors';
import { authRoutes } from './app/modules/auth/auth.route';
import { recipeRoutes } from './app/modules/recipe/recipe.route';
import { userRoutes } from './app/modules/user/user.route';
export const app = express();

app.use(express.json());

app.use(cors({
  origin: ['https://foodrecipe-client.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));



// -----ROUTES START----- //
app.use('/api', authRoutes);
app.use('/api', recipeRoutes);
app.use('/api', userRoutes);

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