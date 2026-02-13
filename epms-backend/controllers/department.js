import db from "../config/db.js";

export const createDepartment = async (req, res) => {
  try {
    let { departmentCode, departmentName, grossSalary } = req.body;
    const userId = req.userId;

    if (!departmentCode || !departmentName || grossSalary == null) {
      return res.status(400).json({ message: "Please fill in all required fields: Department Code, Department Name, and Base Gross Salary." });
    }

    grossSalary = Number(grossSalary);
    if (isNaN(grossSalary) || grossSalary < 0) {
      return res.status(400).json({ message: "Base Gross Salary must be a valid positive number." });
    }

    const sql = "INSERT INTO department (departmentCode, departmentName, grossSalary, userId) VALUES (?, ?, ?, ?)";

    db.query(sql, [departmentCode, departmentName, grossSalary, userId], (err, results) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "A department with this code already exists. Please use a different code." });
        }
        console.error(err);
        return res.status(500).json({ message: "Unable to create department. Please try again later." });
      }

      return res.status(201).json({
        message: "Department created successfully.",
        department: { departmentCode, departmentName, grossSalary }
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "An unexpected error occurred. Please try again." });
  }
};

export const getDepartments = async (req, res) => {
  try {
    const userId = req.userId;
    const sql = "SELECT * FROM department WHERE userId = ? OR userId IS NULL";

    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Unable to fetch departments. Please try again." });
      }

      return res.status(200).json({
        message: "Departments list retrieved successfully.",
        departments: results
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "An unexpected error occurred. Please try again." });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { departmentCode } = req.params;
    let { departmentName, grossSalary } = req.body;
    const userId = req.userId;

    if (!departmentCode) {
      return res.status(400).json({ message: "Department code is required to update a department." });
    }

    grossSalary = Number(grossSalary);
    if (isNaN(grossSalary) || grossSalary < 0) {
      return res.status(400).json({ message: "Base Gross Salary must be a valid positive number." });
    }

    const sql = "UPDATE department SET departmentName = ?, grossSalary = ? WHERE departmentCode = ? AND (userId = ? OR userId IS NULL)";

    db.query(sql, [departmentName, grossSalary, departmentCode, userId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Unable to update department. Please try again later." });
      }

      if (results.affectedRows > 0) {
        return res.status(200).json({ message: "Department updated successfully." });
      } else {
        return res.status(404).json({ message: "Department not found or you don't have permission to update it." });
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "An unexpected error occurred. Please try again." });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const { departmentCode } = req.params;
    const userId = req.userId;

    if (!departmentCode) {
      return res.status(400).json({ message: "Department code is required to delete a department." });
    }

    const sql = "DELETE FROM department WHERE departmentCode = ? AND (userId = ? OR userId IS NULL)";

    db.query(sql, [departmentCode, userId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Unable to delete department. Please try again later." });
      }

      if (results.affectedRows > 0) {
        return res.status(200).json({ message: "Department deleted successfully." });
      } else {
        return res.status(404).json({ message: "Department not found or you don't have permission to delete it." });
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "An unexpected error occurred. Please try again." });
  }
};
