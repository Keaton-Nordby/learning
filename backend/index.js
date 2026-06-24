import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import { Employee } from "./models/Employee.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "working" });
});

/*
 Add routes
 get employees
 post emplyoees
 put employess:id
 delete emplyees:id
*/

app.get("/employees", (req, res) => {
  res.json(employees);
});

app.get("/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find((emp) => emp.id === id);

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }
  return res.json(employee);
});

app.post("/employees", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      position,
      department,
      salary,
      hireDate,
      employeeId,
    } = req.body;
    if (!firstName || !lastName) {
      return res
        .status(400)
        .json({ message: "Please provide first and last name" });
    }

    const newEmployee = Employee.create({
      employeeId,
      firstName,
      lastName,
      email,
      position,
      department,
      salary,
      hireDate,
    });

    return res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Create employee error: ", error);

    return res
      .status(500)
      .json({ message: "Server error while creating employee" });
  }
});

app.put("/employees/:id", (req, res) => {
  const employeeId = parseInt(req.params.id);
  const updatedEmployee = req.body;

  const index = employees.find((emp) => emp.id === employeeId);

  if (index === -1) {
    res.status(404).json({ message: "Employee not found" });
  }

  res.json({
    message: "Employee updated successfully",
    employee: employee[index],
  });
});

app.delete("/employees/:id", (req, res) => {
  const employeeId = parseInt(req.params.id);

  const index = employees.findIndex((emp) => emp.id === employeeId);

  if (index === -1) {
    res.status(404).json({ message: "Employee not found" });
  }
  const deletedEmployee = employees.splice(index, 1);

  res
    .status(200)
    .json({ message: "Employee deleted successfully", deletedEmployee });
});

app.listen(PORT, () => {
  console.log(`Backend is running on port: http://localhost:${PORT}`);
});
