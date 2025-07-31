import express from "express";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/constants.js";
import { addUser } from "../services/users.service.js";

const router = express.Router();

router.post("/register", (req, res) => {
  const { name } = req.body;

  if (!name || name.trim().length === 0) {
    return res.status(400).json({ error: "Name is required" });
  }

  const user = addUser(name);

  const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  res.json({
    user: { id: user.id, name: user.name },
    token,
  });
});

export default router;
