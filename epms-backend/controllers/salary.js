import db from "../config/db.js";

export const createSalary = async (req, res) => {
  try {
    const { employeeNumber, month, deductions } = req.body;
    const userId = req.userId;

    if (!employeeNumber || !month) {
      return res.status(400).json({ message: "Please select an employee and a month to create a salary record." });
    }

    // Get employee department
    const getEmployeeSql = "SELECT departmentCode FROM employee WHERE employeeNumber = ? AND (userId = ? OR userId IS NULL)";
    
    db.query(getEmployeeSql, [employeeNumber, userId], (err, empResults) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Unable to retrieve employee information. Please try again." });
      }

      if (!empResults || empResults.length === 0) {
        return res.status(404).json({ message: "Employee not found. Please check the employee number and try again." });
      }

      const departmentCode = empResults[0].departmentCode;

      // Get department gross salary
      const getDeptSql = "SELECT grossSalary FROM department WHERE departmentCode = ? AND (userId = ? OR userId IS NULL)";
      
      db.query(getDeptSql, [departmentCode, userId], (err, deptResults) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Unable to retrieve department information. Please try again." });
        }

        if (!deptResults || deptResults.length === 0) {
          return res.status(404).json({ message: "Department information not found. Please ensure the employee's department exists." });
        }

        const grossSalaryNum = Number(deptResults[0].grossSalary);
        const deductionsNum = deductions ? Number(deductions) : 0;
        const netSalary = grossSalaryNum - deductionsNum;

        const sql = "INSERT INTO salary (employeeNumber, month, grossSalary, deductions, netSalary, userId) VALUES (?, ?, ?, ?, ?, ?)";

        db.query(sql, [employeeNumber, month, grossSalaryNum, deductionsNum, netSalary, userId], (err, results) => {
          if (err) {
            if (err.code === "ER_DUP_ENTRY") {
              return res.status(409).json({ message: "A salary record for this employee and month already exists. Please update the existing record or choose a different month." });
            }
            console.error(err);
            return res.status(500).json({ message: "Unable to create salary record. Please try again later." });
          }

          if (results.affectedRows > 0) {
            return res.status(201).json({ 
              message: "Salary record created successfully.", 
              salary: { 
                employeeNumber, 
                month, 
                grossSalary: grossSalaryNum, 
                deductions: deductionsNum,
                netSalary 
              } 
            });
          } else {
            return res.status(400).json({ message: "Failed to create salary record. Please try again." });
          }
        });
      });
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "An unexpected error occurred. Please try again." });
  }
};

export const getSalary = async (req, res) => {
  try {
    const userId = req.userId;
    const sql = "SELECT s.*, e.firstName, e.lastName, e.position FROM salary s LEFT JOIN employee e ON s.employeeNumber = e.employeeNumber WHERE s.userId = ? OR s.userId IS NULL ORDER BY s.month DESC";

    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Unable to fetch salary records. Please try again." });
      }
      
      return res.status(200).json({
        message: "Salary records retrieved successfully.",
        salary: results || []
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "An unexpected error occurred. Please try again." });
  }
};

export const getSalaryByEmployee = async (req, res) => {
  try {
    const { employeeNumber } = req.params;
    const userId = req.userId;

    if (!employeeNumber) {
      return res.status(400).json({ message: "Employee number is required to fetch salary records." });
    }

    const sql = "SELECT s.*, e.firstName, e.lastName, e.position FROM salary s LEFT JOIN employee e ON s.employeeNumber = e.employeeNumber WHERE s.employeeNumber = ? AND (s.userId = ? OR s.userId IS NULL)";

    db.query(sql, [employeeNumber, userId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Unable to fetch salary records. Please try again." });
      }

      return res.status(200).json({
        message: results && results.length > 0 ? "Salary records retrieved successfully." : "No salary records found for this employee.",
        salary: results || []
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "An unexpected error occurred. Please try again." });
  }
};

export const deleteSalary = async (req, res) => {
  try {
    const { salaryId } = req.params;
    const userId = req.userId;

    if (!salaryId) {
      return res.status(400).json({ message: "Salary ID is required to delete a salary record." });
    }

    const sql = "DELETE FROM salary WHERE salaryId = ? AND (userId = ? OR userId IS NULL)";

    db.query(sql, [salaryId, userId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Unable to delete salary record. Please try again later." });
      }

      if (results.affectedRows > 0) {
        return res.status(200).json({ message: "Salary record deleted successfully." });
      } else {
        return res.status(404).json({ message: "Salary record not found or you don't have permission to delete it." });
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "An unexpected error occurred. Please try again." });
  }
};
