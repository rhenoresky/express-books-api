import express from 'express';
import dotenv from 'dotenv';
import categoriesRouter from './category/controller.js';
import bookRouter from './book/controller.js';
import authRouter from './auth/controller.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/categories', categoriesRouter);
app.use('/books', bookRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
