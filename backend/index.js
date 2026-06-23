import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "working" });
});

let employees = [
  {
    id: 1,
    employeeId: "EMP001",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@company.com",
    position: "Software Engineer",
    department: "Engineering",
    salary: 95000,
    hireDate: "2024-06-01",
  },
  {
    id: 2,
    employeeId: "EMP002",
    firstName: "Emily",
    lastName: "Johnson",
    email: "emily.johnson@company.com",
    position: "Product Manager",
    department: "Product",
    salary: 105000,
    hireDate: "2023-09-15",
  },
  {
    id: 3,
    employeeId: "EMP003",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@company.com",
    position: "UX Designer",
    department: "Design",
    salary: 85000,
    hireDate: "2022-11-20",
  },
];

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

app.post("/employees", (req, res) => {
  const newEmployee = req.body;

  if (!newEmployee.firstName || !newEmployee.lastName) {
    return res.status(400).json({
      message: "Please give the employee a valid first and/or last name",
    });
  }

  newEmployee.id = employees.length + 1;
  employees.push(newEmployee);

  return res.status(201).json({
    message: "Employee created successfully",
    employee: newEmployee,
  });
});

app.put("/employee/:id", (req, res) => {
  const employeeId = parseInt(req.params.id);
  const updatedEmployee = req.body;

  const employee = employees.find((emp) => emp.id === employeeId);

  if (index === -1) {
    res.status(404).json({ message: "Employee not found" });
  }

  res.json({
    message: "Employee updated successfully",
    employee,
  });
});

app.delete("/employee/:id", (req, res) => {
  const employeeId = parseInt(req.params.id);

  const index = employees.findIndex((emp) => emp.id === employeeId);

  if (!employee) {
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
