import express from "express"
import { createDepartment, getDepartments, updateDepartment, deleteDepartment } from "../controllers/department.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/department", authMiddleware, createDepartment);
router.get("/department", authMiddleware, getDepartments);
router.put("/department/:departmentCode", authMiddleware, updateDepartment);
router.delete("/department/:departmentCode", authMiddleware, deleteDepartment);

export default router;
