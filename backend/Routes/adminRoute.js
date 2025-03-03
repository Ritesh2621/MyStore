import express from "express";
import { UserModel } from "../Model/userModel.js";
import  {OrderModel}  from "../Model/Order.js";
import { ProductModel } from "../Model/productModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const router = express.Router();
router.use(cors()); // Allow CORS

// Middleware to verify admin
const verifyAdmin = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(403).json({ message: "Access denied: No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token", error: err.message });
        }
        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" });
        }
        next();
    });
};

// Admin Dashboard - Overview
router.get("/dashboard",  async (req, res) => {
    try {
        const userCount = await UserModel.countDocuments();
        const orderCount = await OrderModel.countDocuments();
        const serviceCount = await ProductModel.countDocuments();

        res.status(200).json({
            userCount,
            orderCount,
            serviceCount,
           
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Manage Orders
router.get("/orders",  async (req, res) => {
    try {
        const orders = await OrderModel.find().populate("userOwner", "name email");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.put("/orders/:id",  async (req, res) => {
    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Order updated successfully", updatedOrder });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.delete("/orders/:id",  async (req, res) => {
    try {
        await OrderModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Manage Services
router.get("/product",  async (req, res) => {
    try {
        const services = await ProductModel.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.post("/services", async (req, res) => {
    try {
        const newService = new ProductModel(req.body);
        await newService.save();
        res.status(201).json({ message: "Service added successfully", newService });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.put("/services/:id",  async (req, res) => {
    try {
        const updatedService = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Service updated successfully", updatedService });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.delete("/services/:id",  async (req, res) => {
    try {
        await ProductModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


// Manage Users - Get users with role 'user'
router.get("/users/customers", async (req, res) => {
    try {
        const customers = await UserModel.find({ role: "user" });
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Manage Users - Get users with role 'vendor'
router.get("/partners", async (req, res) => {
    try {
        const vendors = await UserModel.find({ role: "partner" });
        res.status(200).json(vendors);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


router.post('/add-vendor', async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;

        // Validate input fields
        if (!name || !phone || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if the email already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new vendor user
        const newVendor = new UserModel({
            name,
            phone,
            email,
            password: hashedPassword,
            role: 'partner'  // Assign the role as 'vendor'
        });

        // Save the new vendor to the database
        await newVendor.save();

        // Exclude password before sending the response
        const vendorResponse = newVendor.toObject();
        delete vendorResponse.password;

        res.status(201).json({ message: 'Vendor added successfully', vendor: vendorResponse });
    } catch (error) {
        console.error('Error adding vendor:', error);
        res.status(500).json({ error: 'Error adding vendor' });
    }
});



router.put("/users/:id",  async (req, res) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.delete("/users/:id",  async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});



// Generate Reports
router.get("/reports",  async (req, res) => {
    try {
        // Example: Group orders by status and calculate total
        const orderStats = await OrderModel.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        const userStats = await UserModel.aggregate([
            { $group: { _id: "$role", count: { $sum: 1 } } }
        ]);

        res.status(200).json({
            orderStats,
            userStats
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

export { router as AdminRouter };