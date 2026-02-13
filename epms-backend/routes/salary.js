import express from "express";
import { createSalary, getSalary, getSalaryByEmployee, deleteSalary } from "../controllers/salary.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/salary", authMiddleware, createSalary);
router.get("/salary", authMiddleware, getSalary);
router.get("/salary/:employeeNumber", authMiddleware, getSalaryByEmployee);
router.delete("/salary/:salaryId", authMiddleware, deleteSalary);

export default router;

