import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config/db";
import membersRoutes from "./routes/membersRoutes";
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear el cuerpo de las peticiones
app.use(express.json());

app.use('/api/members', membersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
