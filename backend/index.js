import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import { Employee } from "./models/Employee.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/employees", employeeRoutes);
app.use("/auth", authRoutes);
app.listen(PORT, () => {
  console.log(`Backend is running on port: http://localhost:${PORT}`);
});
