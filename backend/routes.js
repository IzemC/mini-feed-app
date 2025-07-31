import express from "express";
import authController from "./controllers/auth.controller.js";
import postsController from "./controllers/posts.controller.js";

const router = express.Router();

router.use("/posts", postsController);
router.use("/auth", authController);

export default router;
