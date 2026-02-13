import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import db from "./config/db.js";
import employeeRoutes from "./routes/employee.js";
import departmentRoutes from "./routes/department.js";
import salaryRoutes from "./routes/salary.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:8080",
    "https://epms-frontend-kappa.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));   
app.use(bodyParser.json());

// Routes
app.use(authRoutes);
app.use(departmentRoutes);
app.use(employeeRoutes);
app.use(salaryRoutes);

db.connect(err => {
  if (err) console.error("MySQL connection failed:", err);
  else console.log("MySQL connected successfully");

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
