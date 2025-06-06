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
router.get("/sellers", async (req, res) => {
    try {
        const sellers = await UserModel.find({ role: "seller" });
        res.status(200).json(sellers);
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


// Edit a product
router.put('/edit/:id', async (req, res) => {
  try {
    // Extract the product ID from the URL parameter
    const productId = req.params.id;

    // Extract the fields to update from the request body
    const {
      title,
      description,
      category,
      subcategory,
      subsubcategory,
      price,
      discountPercentage,
      rating,
      brand,
      images,
      sellername,
      quantity,
      warrantyInformation,
      shippingInformation,
      availability,
       trusted,

    } = req.body;

    // Find the product by ID and update the necessary fields
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      {
        title,
        description,
        category,
        subcategory,
        subsubcategory,
        price,
        discountPercentage,
        rating,
        brand,
        images,
        sellername,
        quantity,
        warrantyInformation,
        shippingInformation,
        availability,
       trusted,
      },
      { new: true } // `new: true` ensures the response contains the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Send the updated product back in the response
    res.status(200).json({
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ message: 'Error updating product', error: error.message });
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


// Manage Product Availability and Trusted Status
// PUT - Update both fields
router.put("/product/status/:id", async (req, res) => {
    try {
        const { availability, trusted } = req.body;

        if (availability === undefined || trusted === undefined) {
            return res.status(400).json({ message: "Both 'availability' and 'trusted' fields are required." });
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate(
            req.params.id,
            { availability, trusted },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product status updated", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// PATCH - Partial update
router.patch("/product/status/:id", async (req, res) => {
    try {
        const updates = {};
        if ("availability" in req.body) updates.availability = req.body.availability;
        if ("trusted" in req.body) updates.trusted = req.body.trusted;

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: "At least one of 'availability' or 'trusted' must be provided." });
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product status patched", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// GET - Get current status
router.get("/product/status/:id", async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id).select("availability trusted title");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product status fetched", product });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// DELETE - Reset status to default (false)
router.delete("/product/status/:id", async (req, res) => {
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            req.params.id,
            { availability: false, trusted: false },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product status reset", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


export { router as AdminRouter };