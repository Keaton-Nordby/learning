import mongoose, { mongo } from "mongoose";

const employeeSchema = new mongoose.Schema({
  employeeId: String,
  firstName: String,
  lastName: String,
  email: String,
  position: String,
  department: String,
  salary: Number,
  hireDate: String,
});

export const Employee = mongoose.model("Employee", employeeSchema);
