import express from "express";
import authControllers from "../controllers/auth-controllers.js";

const router = express.Router();

router.route("/login").post(authControllers.login);
router.post("/refresh", authControllers.refreshAccessToken);
router.post("/logout", authControllers.logout);

export default router;
