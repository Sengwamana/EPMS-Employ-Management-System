import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Session expired. Please login again." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Your session has expired. Please login again." });
    }
    return res.status(401).json({ message: "Invalid session. Please login again." });
  }
};
