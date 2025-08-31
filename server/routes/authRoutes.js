import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import { z } from "zod";
import User from "../models/User.js";

export const router = express.Router();

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "30s" });
};

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 chars"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body);

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ status: 400, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });
    return res
      .status(201)
      .json({ status: 201, message: "Registered successfully", token: generateToken(user) });
  } catch (err) {
    if (err.errors)
      return res.status(400).json({
        status: 400,
        message: err.errors.map((e) => e.message),
      });
    return res.status(500).json({ status: 500, message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ status: 404, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ status: 401, message: "Invalid credentials" });

    return res
      .status(200)
      .json({ status: 200, message: "Login successful", token: generateToken(user) });
  } catch (err) {
    if (err.errors)
      return res.status(400).json({
        status: 400,
        message: err.errors.map((e) => e.message),
      });
    return res.status(500).json({ status: 500, message: "Server error" });
  }
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  (req, res) => {

    const token = generateToken(req.user);
    res.redirect(`http://localhost:5173/google-success?token=${token}`);
  }
);