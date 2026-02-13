import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function initializeDatabase() {
  const connection = await mysql2.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    console.log('Initializing database tables...');

    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        userId INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        fullName VARCHAR(200),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ users table created');

    // Create department table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS department (
        departmentCode VARCHAR(10) PRIMARY KEY,
        departmentName VARCHAR(100) NOT NULL,
        grossSalary DECIMAL(10,2) NOT NULL,
        userId INT NULL,
        FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
      )
    `);
    console.log('✓ department table created');

    // Create employee table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS employee (
        employeeNumber INT PRIMARY KEY AUTO_INCREMENT,
        firstName VARCHAR(200) NOT NULL,
        lastName VARCHAR(200) NOT NULL,
        gender ENUM('female','male','other') NOT NULL,
        address VARCHAR(100),
        position VARCHAR(100),
        departmentCode VARCHAR(10),
        userId INT,
        FOREIGN KEY (departmentCode) REFERENCES department(departmentCode),
        FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
      )
    `);
    console.log('✓ employee table created');

    // Create salary table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS salary (
        salaryId INT PRIMARY KEY AUTO_INCREMENT,
        employeeNumber INT NOT NULL,
        month VARCHAR(10) NOT NULL,
        grossSalary DECIMAL(10,2) NOT NULL,
        deductions DECIMAL(10,2) DEFAULT 0,
        netSalary DECIMAL(10,2) NOT NULL,
        userId INT,
        UNIQUE KEY unique_employee_month (employeeNumber, month),
        FOREIGN KEY (employeeNumber) REFERENCES employee(employeeNumber) ON DELETE CASCADE,
        FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
      )
    `);
    console.log('✓ salary table created');

    console.log('\n✅ Database initialization completed successfully!');
    console.log('\nAll tables are ready:');
    console.log('  - users (with fullName, createdAt, updatedAt)');
    console.log('  - department');
    console.log('  - employee (with gender, address, userId)');
    console.log('  - salary (with salaryId, userId, unique constraint)');

  } catch (error) {
    if (error.code === 'ER_TABLE_EXISTS_ERROR') {
      console.log('✓ Tables already exist - skipping creation');
      console.log('Run "npm run migrate" if you need to add missing columns');
    } else {
      console.error('❌ Error initializing database:', error.message);
      process.exit(1);
    }
  } finally {
    await connection.end();
  }
}

initializeDatabase();
