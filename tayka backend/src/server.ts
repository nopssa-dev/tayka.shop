import express  from "express";
import dotenv from 'dotenv'
import { connectDB } from "./config/db";
import { UserController } from "./controllers/UserController";
import { use } from "react";
import membersRoutes from "./routes/membersRoutes";

dotenv.config()
connectDB()

const app = express()
app.use('/api/members', membersRoutes)

export default app