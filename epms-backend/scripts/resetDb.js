import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise(resolve => rl.question(query, resolve));

async function resetDatabase() {
  try {
    console.log('\n⚠️  DATABASE RESET WARNING ⚠️');
    console.log('This will DROP ALL TABLES and delete all data!');
    console.log('Database:', process.env.DB_NAME);
    console.log('Host:', process.env.DB_HOST);
    console.log('');
    
    const confirm = await question('Are you sure you want to continue? (yes/no): ');
    
    if (confirm.toLowerCase() !== 'yes') {
      console.log('Reset cancelled.');
      rl.close();
      process.exit(0);
    }

    const connection = await mysql2.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('\nDropping all tables...');

    // Drop tables in correct order (foreign key dependencies first)
    try {
      await connection.execute('DROP TABLE IF EXISTS salary');
      console.log('✓ salary table dropped');
    } catch (error) {
      console.log('  salary table: skipped');
    }

    try {
      await connection.execute('DROP TABLE IF EXISTS employee');
      console.log('✓ employee table dropped');
    } catch (error) {
      console.log('  employee table: skipped');
    }

    try {
      await connection.execute('DROP TABLE IF EXISTS department');
      console.log('✓ department table dropped');
    } catch (error) {
      console.log('  department table: skipped');
    }

    try {
      await connection.execute('DROP TABLE IF EXISTS users');
      console.log('✓ users table dropped');
    } catch (error) {
      console.log('  users table: skipped');
    }

    console.log('\nCreating tables...');

    // Create users table
    await connection.execute(`
      CREATE TABLE users (
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
      CREATE TABLE department (
        departmentCode VARCHAR(10) PRIMARY KEY,
        departmentName VARCHAR(100) NOT NULL,
        grossSalary DECIMAL(10,2) NOT NULL
      )
    `);
    console.log('✓ department table created');

    // Create employee table
    await connection.execute(`
      CREATE TABLE employee (
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
      CREATE TABLE salary (
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

    console.log('\n✅ Database reset completed successfully!');
    console.log('\nAll tables are now fresh and empty:');
    console.log('  - users');
    console.log('  - department');
    console.log('  - employee');
    console.log('  - salary');
    console.log('\nYou can now signup/login to create accounts!');

    await connection.end();

  } catch (error) {
    console.error('\n❌ Error during reset:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

resetDatabase();
