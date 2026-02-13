import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const DB = process.env.DB_NAME;

async function columnExists(conn, table, column) {
  const [rows] = await conn.execute(
    `SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [DB, table, column]
  );
  return rows[0].cnt > 0;
}

async function fkExists(conn, table, column, referencedTable, referencedColumn) {
  const [rows] = await conn.execute(
    `SELECT COUNT(*) AS cnt FROM information_schema.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ? AND REFERENCED_TABLE_NAME = ? AND REFERENCED_COLUMN_NAME = ?`,
    [DB, table, column, referencedTable, referencedColumn]
  );
  return rows[0].cnt > 0;
}

async function run() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    console.log('Checking schema for required columns and constraints...');

    // users: fullName, updatedAt
    if (!(await columnExists(conn, 'users', 'fullName'))) {
      console.log('Adding users.fullName');
      await conn.execute("ALTER TABLE users ADD COLUMN fullName VARCHAR(200) NULL AFTER email");
    } else console.log('users.fullName exists');

    if (!(await columnExists(conn, 'users', 'updatedAt'))) {
      console.log('Adding users.updatedAt');
      await conn.execute("ALTER TABLE users ADD COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER createdAt");
    } else console.log('users.updatedAt exists');

    // department: userId
    if (!(await columnExists(conn, 'department', 'userId'))) {
      console.log('Adding department.userId');
      await conn.execute("ALTER TABLE department ADD COLUMN userId INT NULL AFTER grossSalary");
    } else console.log('department.userId exists');

    const depFk = await fkExists(conn, 'department', 'userId', 'users', 'userId');
    if (!depFk) {
      console.log('Adding FK department.userId -> users.userId');
      try {
        await conn.execute("ALTER TABLE department ADD CONSTRAINT fk_department_userId FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE");
      } catch (err) {
        console.error('Could not add FK for department.userId:', err.message);
      }
    } else console.log('department.userId FK exists');

    // employee: userId
    if (!(await columnExists(conn, 'employee', 'userId'))) {
      console.log('Adding employee.userId');
      await conn.execute("ALTER TABLE employee ADD COLUMN userId INT NULL AFTER departmentCode");
    } else console.log('employee.userId exists');

    const empFk = await fkExists(conn, 'employee', 'userId', 'users', 'userId');
    if (!empFk) {
      console.log('Adding FK employee.userId -> users.userId');
      try {
        await conn.execute("ALTER TABLE employee ADD CONSTRAINT fk_employee_userId FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE");
      } catch (err) {
        console.error('Could not add FK for employee.userId:', err.message);
      }
    } else console.log('employee.userId FK exists');

    // salary: ensure salaryId primary key exists, userId
    if (!(await columnExists(conn, 'salary', 'salaryId'))) {
      console.log('Adding salary.salaryId (auto-increment primary key)');
      try {
        // Add column first
        await conn.execute("ALTER TABLE salary ADD COLUMN salaryId INT NULL FIRST");
        // Populate or set primary key
        await conn.execute("ALTER TABLE salary MODIFY COLUMN salaryId INT NOT NULL AUTO_INCREMENT PRIMARY KEY");
      } catch (err) {
        console.error('Could not add salaryId:', err.message);
      }
    } else console.log('salary.salaryId exists');

    if (!(await columnExists(conn, 'salary', 'userId'))) {
      console.log('Adding salary.userId');
      await conn.execute("ALTER TABLE salary ADD COLUMN userId INT NULL AFTER netSalary");
    } else console.log('salary.userId exists');

    const salFk = await fkExists(conn, 'salary', 'userId', 'users', 'userId');
    if (!salFk) {
      console.log('Adding FK salary.userId -> users.userId');
      try {
        await conn.execute("ALTER TABLE salary ADD CONSTRAINT fk_salary_userId FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE");
      } catch (err) {
        console.error('Could not add FK for salary.userId:', err.message);
      }
    } else console.log('salary.userId FK exists');

    console.log('\nSchema checks complete');
  } catch (err) {
    console.error('Error ensuring columns:', err.message);
    process.exit(1);
  } finally {
    await conn.end();
  }
}

run().catch(err => { console.error(err); process.exit(1); });
