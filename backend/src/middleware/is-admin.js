import "dotenv/config";

const jwtSecret = process.env.JWT_SECRET;

export const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admin Access Only" });
    }
    next();
  } catch (err) {
    console.error(`Error, Admin authorization required`);
  }
};
