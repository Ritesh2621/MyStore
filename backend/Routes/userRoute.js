import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../Model/userModel.js";
import transporter from "../mailConfig.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const otpStore = new Map();

router.use(cookieParser());

// Register Route
router.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;
  const user = await UserModel.findOne({ email });

  try {
    if (user) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// OTP Login Route
router.post("/login", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email does not exist" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore.set(email, { otp, expires: Date.now() + 10 * 60 * 1000 });

    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It is valid for the next 10 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Failed to send OTP" });
      }
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "OTP sent successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing login", error });
  }
});

// OTP Verification Route
router.post("/login-verify", async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Retrieve and verify OTP
    const record = otpStore.get(email);
    if (!record || record.otp !== otp || Date.now() > record.expires) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // OTP is valid
    otpStore.delete(email); // Optionally delete OTP after verification

    // Find the user and generate a token
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set the token as a cookie
    res.cookie("access_token", token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", // Only set secure flag in production
    });

    // Send a single response
    return res.status(200).json({
      // Use return to avoid sending multiple responses
      message: "OTP verified successfully",
      token,
      userId: user._id,
      role: user.role,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error); // Log the error for debugging
    return res.status(500).json({ message: "Error verifying OTP", error }); // Return error response
  }
});

export { router as UserRouter };
