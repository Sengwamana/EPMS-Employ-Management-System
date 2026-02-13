import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export const signup = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please provide username, email, and password to create an account." });
    }

   
    const checkSql = "SELECT * FROM users WHERE username = ? OR email = ?";
    db.query(checkSql, [username, email], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Unable to create account. Please try again later." });
      }

      if (results.length > 0) {
        return res.status(409).json({ message: "This username or email is already registered. Please use a different one or try logging in." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const insertSql = "INSERT INTO users (username, email, password, fullName) VALUES (?, ?, ?, ?)";
      db.query(insertSql, [username, email, hashedPassword, fullName || null], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Unable to create account. Please try again later." });
        }

        return res.status(201).json({
          message: "Account created successfully. You can now login.",
          userId: result.insertId,
          username,
          email,
          fullName
        });
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "An unexpected error occurred. Please try again." });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Please provide username and password to login." });
    }

    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Login failed. Please try again later." });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid username or password. Please check and try again." });
      }

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid username or password. Please check and try again." });
      }

      const token = jwt.sign(
        { userId: user.userId, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      return res.status(200).json({
        message: "Login successful. Welcome back!",
        token,
        user: {
          userId: user.userId,
          username: user.username,
          email: user.email,
          fullName: user.fullName
        }
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "An unexpected error occurred during login. Please try again." });
  }
};
