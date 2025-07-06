import "dotenv/config";
import cors from "cors";
import path from "path";
import express from "express";
import { dirname } from 'path';
import connectDb from "./db/db.js";
import { fileURLToPath } from 'url';
import userRouter from "./routes/authRoute.js";
import incomeRouter from './routes/incomeRoute.js'
import expenseRouter from './routes/expenseRoute.js'
import dashboardRouter from './routes/dashboardRoute.js'

const app = express();

connectDb();

// ------ Middleware -----------
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENTURL || "*",
    methods: ["GET", "POST", "PUT", "UPDATE", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ------ Routes -----------
app.use("/api/status", (req, res) => res.send("Server is Live!"));
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/income", incomeRouter);
app.use("/api/v1/expense", expenseRouter);
app.use("/api/v1/dashboard", dashboardRouter);



// ------ File Upload Route -----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ------ Port 8080 -----------
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`server runing on http://localhost:${PORT}`)
);
