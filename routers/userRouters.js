import User from "../models/userSchema.js";
import express from "express";
import { catchAsync, httpError } from "../middleware/errorMiddleware.js";

const router = express.Router();

router.post("/user", catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  await new User({ name, email, password }).save();
  res.status(201).json({ success: true, message: "signup successfully" });
}));

router.get("/user", catchAsync(async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (!user) throw httpError("User not found", 404);
  res.status(200).json({ success: true, data: user });
}));

export default router;
