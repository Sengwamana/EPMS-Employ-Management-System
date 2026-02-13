import express from "express"
import { createEmployee, getEmployee, updateEmployee, deleteEmployee } from "../controllers/employee.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/employee", authMiddleware, createEmployee);
router.get("/employee", authMiddleware, getEmployee);
router.put("/employee/:employeeNumber", authMiddleware, updateEmployee);
router.delete("/employee/:employeeNumber", authMiddleware, deleteEmployee);

export default router;
