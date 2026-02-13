-- =====================================================
-- EPMS - Employee Payroll Management System
-- MySQL Database Schema
-- =====================================================
-- Run this file to create the database and all tables:
--   mysql -u root -p < database.sql
-- =====================================================

-- Create database
CREATE DATABASE IF NOT EXISTS EPMS;
USE EPMS;

-- =====================================================
-- 1. USERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    userId INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullName VARCHAR(200),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- 2. DEPARTMENT TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS department (
    departmentCode VARCHAR(10) PRIMARY KEY,
    departmentName VARCHAR(100) NOT NULL,
    grossSalary DECIMAL(10,2) NOT NULL,
    userId INT NULL,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
);

-- =====================================================
-- 3. EMPLOYEE TABLE
-- =====================================================
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
);

-- =====================================================
-- 4. SALARY TABLE
-- =====================================================
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
);

-- =====================================================
-- INDEXES for performance
-- =====================================================
CREATE INDEX idx_employee_department ON employee(departmentCode);
CREATE INDEX idx_employee_user ON employee(userId);
CREATE INDEX idx_salary_employee ON salary(employeeNumber);
CREATE INDEX idx_salary_month ON salary(month);
CREATE INDEX idx_salary_user ON salary(userId);
CREATE INDEX idx_department_user ON department(userId);
