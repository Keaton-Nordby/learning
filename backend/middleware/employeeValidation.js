export const validateEmployee = (req, res, next) => {
  const { firstName, lastName, email, salary, employeeId, department } =
    req.body;

  // 1. Required fields
  if (!firstName || !lastName) {
    return res.status(400).json({
      message: "First name and last name are required",
    });
  }

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  if (!employeeId) {
    return res.status(400).json({
      message: "Employee ID is required",
    });
  }

  // 2. Format check
  if (email && !email.includes("@")) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }

  // 3. Business rules
  if (salary !== undefined && salary <= 0) {
    return res.status(400).json({
      message: "Salary must be greater than 0",
    });
  }

  const allowedDepartments = ["Engineering", "HR", "Sales"];

  if (department && !allowedDepartments.includes(department)) {
    return res.status(400).json({
      message: "Invalid department",
    });
  }

  // PASS REQUEST TO CONTROLLER
  next();
};
