import express from "express";
import { VisitModel } from "../Model/visitModel.js";
import nodemailer from "nodemailer";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Twilio Config
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

// Nodemailer Config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// POST: Create new visit
router.post("/visit", async (req, res) => {
  try {
    const visit = new VisitModel(req.body);
    await visit.save();
    res.status(201).json({ message: "Visit recorded", visit });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Fetch all visits
router.get("/visit", async (req, res) => {
  try {
    const visits = await VisitModel.find();
    res.status(200).json(visits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Remove visit by ID
router.delete("/visit/:id", async (req, res) => {
  try {
    const result = await VisitModel.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Visit not found" });
    res.status(200).json({ message: "Visit deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Send email or SMS notification
router.post("/visit/notify", async (req, res) => {
  const { email, mobileNumber, name } = req.body;

  const messageText = `Hi ${name || "there"}, thanks for visiting our website!`;

  try {
    if (email) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Thank You for Visiting!",
        text: messageText
      });
    }

    if (mobileNumber) {
      await twilioClient.messages.create({
        body: messageText,
        from: TWILIO_PHONE_NUMBER,
        to: mobileNumber
      });
    }

    res.status(200).json({ message: "Notification sent successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send notification", details: err.message });
  }
});

export { router as VisitRouter };
