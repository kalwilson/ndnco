import jwt from "jsonwebtoken";
import "dotenv/config";

const jwtSecret = process.env.JWT_SECRET;

export const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(403).json({ message: "Authorization required" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    req.user = decoded;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired. Please log in again." });
    }

    console.error(`Authentication error: ${err}`);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
