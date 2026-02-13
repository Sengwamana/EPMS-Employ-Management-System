import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function migrateDatabase() {
  const connection = await mysql2.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    console.log('Running database migrations...');

    // Add userId column to department if missing
    try {
      await connection.execute(`
        ALTER TABLE department 
        ADD COLUMN userId INT AFTER grossSalary,
        ADD FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
      `);
      console.log('✓ Added userId column to department table');
    } catch (error) {
      if (error.code === 'ER_DUP_FIELDNAME') {
        console.log('✓ userId column already exists in department table');
      } else if (error.code !== 'ER_DUP_KEYNAME') {
        throw error;
      }
    }

    // Add userId column to employee if missing
    try {
      await connection.execute(`
        ALTER TABLE employee 
        ADD COLUMN userId INT AFTER departmentCode,
        ADD FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
      `);
      console.log('✓ Added userId column to employee table');
    } catch (error) {
      if (error.code === 'ER_DUP_FIELDNAME') {
        console.log('✓ userId column already exists in employee table');
      } else if (error.code !== 'ER_DUP_KEYNAME') {
        throw error;
      }
    }

    // Add salaryId if not exists (salary table might use composite key)
    try {
      await connection.execute(`
        ALTER TABLE salary 
        ADD COLUMN salaryId INT PRIMARY KEY AUTO_INCREMENT FIRST
      `);
      console.log('✓ Added salaryId column to salary table');
    } catch (error) {
      if (error.code === 'ER_DUP_FIELDNAME') {
        console.log('✓ salaryId column already exists in salary table');
      } else if (error.code !== 'ER_MULTIPLE_PRI_KEY') {
        throw error;
      }
    }

    // Add userId to salary if missing
    try {
      await connection.execute(`
        ALTER TABLE salary 
        ADD COLUMN userId INT AFTER netSalary,
        ADD FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
      `);
      console.log('✓ Added userId column to salary table');
    } catch (error) {
      if (error.code === 'ER_DUP_FIELDNAME') {
        console.log('✓ userId column already exists in salary table');
      } else if (error.code !== 'ER_DUP_KEYNAME') {
        throw error;
      }
    }

    // Add timestamp columns to users if missing
    try {
      await connection.execute(`
        ALTER TABLE users 
        ADD COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER createdAt
      `);
      console.log('✓ Added updatedAt column to users table');
    } catch (error) {
      if (error.code === 'ER_DUP_FIELDNAME') {
        console.log('✓ updatedAt column already exists in users table');
      } else {
        throw error;
      }
    }

    console.log('\n✅ Database migration completed successfully!');

  } catch (error) {
    console.error('❌ Error during migration:', error.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

migrateDatabase();
