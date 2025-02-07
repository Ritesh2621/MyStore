import express from "express";
import { UserModel } from "../models/User.js";
import { PickupModel } from "../models/Pickup.js";
import TrackingModel from "../models/TrackingModel.js";
import transporter from "../mailConfig.js";
import nodemailer from "nodemailer";

import { PricelistModel } from "../models/Pricelist.js"; // Import the Pricelist model

const router = express.Router();

// 1. Get all user info (excluding password)
router.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({}).select("-password"); // Exclude password
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});




router.post("/services", async (req, res) => {
  const { items, userOwnerName } = req.body;

  try {
    if (!Array.isArray(items) || items.length === 0 || !userOwnerName) {
      return res
        .status(400)
        .json({ message: "Items and userOwnerName are required." });
    }

    // Find the pickup entry by the userOwnerName
    const pickup = await PickupModel.findOne({ name: userOwnerName });
    if (!pickup) {
      return res
        .status(404)
        .json({ message: "User not found with the provided name." });
    }

    // Get the userOwner's ObjectId from the PickupModel
    const userOwnerId = pickup.userOwner;

    // Find the corresponding user in UserModel
    const userOwner = await UserModel.findById(userOwnerId);
    if (!userOwner) {
      return res.status(404).json({ message: "User not found in UserModel." });
    }

    const pricelist = await PricelistModel.find();
    let totalCost = 0;
    const servicesDetails = [];

    // Iterate through the items and calculate total cost
    for (const item of items) {
      const matchedItem = pricelist
        .flatMap((pl) => pl.content)
        .find((content) => content.Title === item.title);

      if (!matchedItem) {
        return res
          .status(400)
          .json({
            message: `Item '${item.title}' is not available in the pricelist.`,
          });
      }

      const cost = parseFloat(matchedItem.Price);
      if (isNaN(cost)) {
        return res
          .status(400)
          .json({ message: `Invalid price for item '${item.title}'.` });
      }

      totalCost += cost * item.quantity;
      servicesDetails.push({
        title: matchedItem.Title,
        price: cost,
        quantity: item.quantity,
      });
    }

    // Generate a 4-digit token number
    const tokenNumber = Math.floor(1000 + Math.random() * 9000);

    // Create a new tracking record
    const newTrackingRecord = new TrackingModel({
      tokenNumber,
      serviceDetails: {
        items: servicesDetails,
        totalCost,
      },
      userOwner: userOwner._id, // Assign the user's _id from UserModel
    });

    await newTrackingRecord.save();

    // Push the new tracking record's _id into the user's servicesUsed array
    userOwner.servicesUsed.push(newTrackingRecord._id);
    await userOwner.save();

    // Set up the email transport
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Your email from environment variables
      to: pickup.email, // Send to the email from PickupModel
      subject: "Pickup Service Confirmation",
      html: `<p>Hello ${pickup.name},</p>
                   <p>Your pickup service has been successfully registered.</p>
                   <p><strong>Please Don't Share the Token Number details with Anyone</strong></p>
                   <p><strong>Service Details:</strong></p>
                   <ul>
                       <li><strong>Token Number:</strong> ${tokenNumber}</li>
                       <li><strong>Total Cost:</strong> Rs${totalCost}</li>
                       <li><strong>Items:</strong></li>
                       <ul>
                           ${servicesDetails
                             .map(
                               (item) =>
                                 `<li>${item.title}: ${item.quantity} x Rs${item.price}</li>`
                             )
                             .join("")}
                       </ul>
                   </ul>
                   <p><strong>Company Details:</strong></p>
                   <p>Company Name: LEARNOPEDIA SERVICES PVT LTD</p>
                   <p>Contact Number: 7896541230</p>
                   <p>Services: <a href="http://www.laundry.com">www.laundry.com</a></p>
                   <p>Company Address: LEARNOPEDIA SERVICES PVT LTD, THE SPACE, Office No - 612, 6th Floor, Rajaram Patil Nagar, Kharadi, Pune - 411014</p>
                   <p>Thank you for choosing our service! If you have any questions, feel free to reach out to us.</p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "Service record created.",
      data: newTrackingRecord,
    });
  } catch (error) {
    console.error("Error creating service record or sending email:", error);
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});




router.put("/tracking/:id", async (req, res) => {
  const { status, serviceDetails } = req.body;

  try {
    const trackingRecord = await TrackingModel.findByIdAndUpdate(
      req.params.id,
      {
        status,
        serviceDetails,
      },
      { new: true }
    )
      .populate("userOwner", "email name")
      .populate("pickupDetails", "email name");

    if (!trackingRecord) {
      return res.status(404).json({ message: "Tracking record not found" });
    }

    let userEmail = trackingRecord.userOwner?.email;
    let userName = trackingRecord.userOwner?.name;

    if (!userEmail && trackingRecord.pickupDetails) {
      userEmail = trackingRecord.pickupDetails.email;
      userName = trackingRecord.pickupDetails.name;
    }

    if (!userEmail) {
      return res
        .status(400)
        .json({ message: "User email not found for sending confirmation" });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    transporter.verify((error, success) => {
      if (error) {
        console.error("Error with email configuration:", error);
        return res
          .status(500)
          .json({ message: "Email configuration error", error });
      }
      console.log("Email transporter is ready");
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Order Status Update - Token Number: ${trackingRecord.tokenNumber}`,
      html: `
                <h2>Order Tracking Update</h2>
                <p>Dear <strong>${userName || "Customer"},</strong></p>
                <p>Your order with token number <strong>${
                  trackingRecord.tokenNumber
                }</strong> has been updated.</p>
                <p><strong>Current Status: ${status}</strong></p>
                <p>Thank you for using our service! For further assistance, feel free to contact us.</p>
                <p>Best regards,</p>
                  <p><strong>Company Details:</strong></p>
                   <p>Company Name: LEARNOPEDIA SERVICES PVT LTD</p>
                   <p>Contact Number: 7896541230</p>
                   <p>Services: <a href="http://www.laundry.com">www.laundry.com</a></p>
                   <p>Company Address: LEARNOPEDIA SERVICES PVT LTD, THE SPACE, Office No - 612, 6th Floor, Rajaram Patil Nagar, Kharadi, Pune - 411014</p>
                   <p>Thank you for choosing our service! If you have any questions, feel free to reach out to us.</p>`
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Confirmation email sent successfully");
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res
        .status(500)
        .json({
          message: "Failed to send confirmation email",
          error: emailError.message,
        });
    }

    res.status(200).json({
      message: "Tracking record updated successfully",
      data: trackingRecord,
    });
  } catch (error) {
    console.error("Error updating tracking record or sending email:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});




router.get("/tracking", async (req, res) => {
  try {
    // Use populate to get user information associated with userOwner
    const trackingRecords = await TrackingModel.find()
      .populate("userOwner", "name phone") // Specify the fields you want from the UserModel
      .exec();

    res.status(200).json(trackingRecords);
  } catch (error) {
    console.error("Error fetching tracking records:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

export { router as PartnerRouter };