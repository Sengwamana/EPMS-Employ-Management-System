import db from "../config/db.js";

export const createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, address, gender, position, departmentCode } = req.body;
    const userId = req.userId;

    if (!firstName || !lastName || !gender || !position || !departmentCode) {
      return res.status(400).json({ message: "Please fill in all required fields: First Name, Last Name, Gender, Position, and Department." });
    }

    const sql = "INSERT INTO employee (firstName, lastName, gender, address, position, departmentCode, userId) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.query(sql, [firstName, lastName, gender, address, position, departmentCode, userId], (err, results) => {
      if (err) {
        console.error(err);
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "This employee already exists in the system." });
        }
        return res.status(500).json({ message: "Unable to create employee. Please try again later." });
      }

      if (results.affectedRows > 0) {
        return res.status(201).json({ message: "Employee created successfully.", employee: { firstName, lastName, gender, address, position, departmentCode } });
      } else {
        return res.status(400).json({ message: "Failed to create employee. Please try again." });
      }
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "An unexpected error occurred. Please try again." });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const userId = req.userId;
    const sql = "SELECT * FROM employee WHERE userId = ? OR userId IS NULL";

    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Unable to fetch employees. Please try again." });
      }

      return res.status(200).json({
        message: "Employee list retrieved successfully.",
        employee: results
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "An unexpected error occurred. Please try again." });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { employeeNumber } = req.params;
    const { firstName, lastName, address, gender, position, departmentCode } = req.body;
    const userId = req.userId;

    if (!employeeNumber) {
      return res.status(400).json({ message: "Employee number is required to update an employee." });
    }

    const sql = "UPDATE employee SET firstName = ?, lastName = ?, gender = ?, address = ?, position = ?, departmentCode = ? WHERE employeeNumber = ? AND (userId = ? OR userId IS NULL)";

    db.query(sql, [firstName, lastName, gender, address, position, departmentCode, employeeNumber, userId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Unable to update employee. Please try again later." });
      }

      if (results.affectedRows > 0) {
        return res.status(200).json({ message: "Employee updated successfully." });
      } else {
        return res.status(404).json({ message: "Employee not found or you don't have permission to update it." });
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "An unexpected error occurred. Please try again." });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { employeeNumber } = req.params;
    const userId = req.userId;

    if (!employeeNumber) {
      return res.status(400).json({ message: "Employee number is required to delete an employee." });
    }

    const sql = "DELETE FROM employee WHERE employeeNumber = ? AND (userId = ? OR userId IS NULL)";

    db.query(sql, [employeeNumber, userId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Unable to delete employee. Please try again later." });
      }

      if (results.affectedRows > 0) {
        return res.status(200).json({ message: "Employee deleted successfully." });
      } else {
        return res.status(404).json({ message: "Employee not found or you don't have permission to delete it." });
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "An unexpected error occurred. Please try again." });
  }
};
