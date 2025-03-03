import express from "express";
import { OrderModel } from "../Model/Order.js";
import { ProductModel } from "../Model/productModel.js";

const router = express.Router();

// ✅ POST Create Order
router.post("/", async (req, res) => {
  try {
    const { customer, products, totalAmount, userOwner } = req.body;

    // Validate required fields
    if (!customer || !products || !totalAmount || !userOwner) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const tokenNumber = Math.floor(1000 + Math.random() * 9000);

    // Create a new order
    const newOrder = new OrderModel({
      tokenNumber,
      customer,
      products,
      totalAmount,
      userOwner,
    });

    // Save the order to the database
    await newOrder.save();

    // Return the created order
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ GET Orders by User ID (For User Panel)
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if the User ID is valid
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    // Fetch the orders for the user
    const orders = await OrderModel.find({ userOwner: userId }).populate("userOwner");

    // If no orders found, return an empty array
    if (!orders.length) {
      return res.status(200).json([]);
    }

    // Return the orders for the user
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ GET Orders for Seller (For Seller Panel)
router.get("/orders-by-seller/:sellerId", async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    // Validate sellerId format
    if (!sellerId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid Seller ID" });
    }

    // Fetch orders where the sellerId is present in the product's sellerId
    const orders = await OrderModel.find({
      "products.sellerId": sellerId, // Filter orders based on sellerId in the products
    }).populate("userOwner"); // Optionally populate userOwner if needed

    // If no orders found, return an empty array
    if (!orders.length) {
      return res.status(200).json([]);
    }

    // Return the orders for the seller
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders for seller:", error);
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ GET All Orders (For Admin Panel)
router.get("/", async (req, res) => {
  try {
    const orders = await OrderModel.find().populate("userOwner");
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ PUT Update Order Status (For Admin Panel)
router.put("/:orderId/status", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    // Ensure the order status is one of the allowed values
    if (!['pending', 'shipped', 'delivered'].includes(orderStatus)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    // Find the order by ID and update the status
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Return the updated order
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Server Error", error });
  }
});

export { router as OrderRouter };
