import express from "express";
import { userLogin, resetPassword } from "../controllers/userLogin.js";

const router = express.Router();

router.post("/login", userLogin)
router.post("/reset-password", resetPassword)

export default router;