import express from "express";
import {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";
import { validateEmployee } from "../middleware/employeeValidation.js";
import { validateId } from "../middleware/validateId.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getEmployees);

router.get("/:id", protect, validateId, getEmployeeById);

router.post("/", protect, validateEmployee, addEmployee);

router.put("/:id", protect, validateId, validateEmployee, updateEmployee);

router.delete("/:id", protect, validateId, deleteEmployee);

export default router;
