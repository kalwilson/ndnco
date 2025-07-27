import "dotenv/config";
import db from "../db/dbConnection.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const jwtSecret = process.env.JWT_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

let refreshTokens = [];

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db("users").where({ username }).first();
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const matching = await bcrypt.compare(password, user.password);
    if (!matching) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const accessToken = jwt.sign({ id: user.id, role: user.role }, jwtSecret, {
      expiresIn: "1hr",
    });

    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      refreshTokenSecret,
      { expiresIn: "7d" }
    );

    refreshTokens.push(refreshToken);

    return res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
      user: { id: user.id, username: user.username },
    });
  } catch (err) {
    console.error(`Error at login: ${err}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(403).json({ message: `Refresh token required` });
  }
  try {
    const decoded = jwt.verify(refreshToken, refreshTokenSecret);

    const newAccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      jwtSecret,
      { expiresIn: "1hr" }
    );
    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Error with refreshing access token:", err);
    return res
      .status(401)
      .json({ message: `Invalid or expired refresh token` });
  }
};

const logout = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(403).json({ message: `Refresh token required` });
  }

  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json({ message: `Success, logged out` });
};

export default { login, refreshAccessToken, logout };
