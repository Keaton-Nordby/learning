import { Employee } from "../models/Employee.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    return res
      .status(200)
      .json({ message: "Employees retrieved successfully", employees });
  } catch (error) {
    console.log("Error fetching employees: ", error);
    return res.status(500).json({ message: "Employees could not be returned" });
  }
};

export const getEmployeeById = async (req, res) => {
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
};

export const addEmployee = async (req, res) => {
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

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!email.includes("@")) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (salary !== undefined && salary <= 0) {
      return res.status(400).json({
        message: "Salary must be greater than 0",
      });
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
};

export const updateEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const updatedEmployee = req.body;
    const employee = await Employee.findByIdAndUpdate(
      employeeId,
      updatedEmployee,
      {
        new: true,
        runValidators: true,
      },
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
    return res.status(500).json({ message: "Unable to update employee" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      message: "Employee deleted successfully",
      employee: deletedEmployee,
    });
  } catch (error) {
    console.error("Deleting employee error: ", error);

    return res
      .status(500)
      .json({ message: "Server error while deleting employee" });
  }
};
