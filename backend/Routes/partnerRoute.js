import express from "express";
import { UserModel } from "../Model/userModel.js";
import { OrderModel } from '../Model/Order.js';

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

// 2. Update order status (pending, shipped, delivered)
router.patch("/:orderId/status", async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body; // We expect 'orderStatus' to be one of ['pending', 'shipped', 'delivered']

  if (!['pending', 'shipped', 'delivered'].includes(orderStatus)) {
    return res.status(400).json({
      message: "Invalid status. Valid statuses are 'pending', 'shipped', or 'delivered'."
    });
  }

  try {
    const order = await OrderModel.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true } // Return the updated order
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// 3. Get all orders for a partner (including products and customer details)
// Added filter support by status (pending, shipped, delivered)
router.get("/orders", async (req, res) => {
  const { status } = req.query; // Retrieve status from query parameter

  // Validate the status
  if (status && !['pending', 'shipped', 'delivered'].includes(status)) {
    return res.status(400).json({
      message: "Invalid status. Valid statuses are 'pending', 'shipped', or 'delivered'."
    });
  }

  try {
    // Apply the filter if a status is provided
    const filter = status ? { orderStatus: status } : {}; 

    const orders = await OrderModel.find(filter)
      .populate("userOwner", "firstName lastName email phone") // populate customer details
      .exec();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found." });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// 4. Get a specific order for tracking (to get order details by order ID)
router.get("/:orderId", async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await OrderModel.findById(orderId)
      .populate("userOwner", "firstName lastName email phone") // populate customer details
      .exec();

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order details:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

export { router as PartnerRouter };
