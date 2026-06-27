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

app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    return res
      .status(200)
      .json({ message: "Employees retrieved successfully", employees });
  } catch (error) {
    console.log("Error fetching employees: ", error);
    return res.status(500).json({ message: "Employees could not be returned" });
  }
});

app.get("/employees/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.json(employee);
  } catch (error) {
    console.error("Error retrieving employee info: ", error);
    return res.status(500).json({ message: "Error retrieving employee" });
  }
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

    const newEmployee = await Employee.create({
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

app.put("/employees/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;
    const updatedEmployee = req.body;
    const employee = await Employee.findByIdAndUpdate(
      employeeId,
      updatedEmployee,
      { new: true },
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.json({
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    console.error("Error trying to update employee: ", error);
    res.status(500).json({ message: "Unable to update employee" });
  }
});

app.delete("/employees/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      res.status(404).json({ message: "Employee not found" });
    }

    return res.json(deletedEmployee);
  } catch (error) {
    console.error("Deleting employee error: ", error);

    return res
      .status(500)
      .json({ message: "Server error while deleting employee" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend is running on port: http://localhost:${PORT}`);
});
