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

const router = express.Router();

router.get("/", getEmployees);

router.get("/:id", validateId, getEmployeeById);

router.post("/", validateEmployee, addEmployee);

router.put("/:id", validateId, validateEmployee, updateEmployee);

router.delete("/:id", validateId, deleteEmployee);

export default router;
