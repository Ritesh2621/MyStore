import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../Model/userModel.js";
import { ProductModel } from "../Model/productModel.js";
import { SupplierModel } from "../Model/Supplier.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// ✅ Supplier Registration
router.post("/register", async (req, res) => {
  try {
    console.log("Registration request received", req.body);

    const {
      userId,
      uinNumber,
      gstNumber,
      address,
      pincode,
      city,
      bankAccount,
      ifsc,
      bankName,
      upiId,
      businessName,
      businessType,
      contactNumber,
      productCategory,
    } = req.body;

    // Ensure all required fields are provided
    if (
      !userId ||
      !address ||
      !pincode ||
      !city ||
      !bankAccount ||
      !ifsc ||
      !bankName ||
      !businessName ||
      !businessType ||
      !contactNumber ||
      !productCategory
    ) {
      console.error("Validation failed: Missing fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      console.error("User not found with ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    // Check if already a supplier
    const existingSupplier = await SupplierModel.findOne({ userId });
    if (existingSupplier) {
      console.error("User is already a supplier");
      return res.status(400).json({ message: "Already a supplier" });
    }

    // Create new supplier
    const newSupplier = new SupplierModel({
      userId,
      uinNumber,
      gstNumber,
      address,
      pincode,
      city,
      bankAccount,
      ifsc,
      bankName,
      upiId,
      businessName,
      businessType,
      contactNumber,
      productCategory,
    });

    await newSupplier.save();
    console.log("New supplier created successfully:", newSupplier);

    // Update user role to 'seller'
    user.role = "seller";
    await user.save();
    console.log("User role updated to seller");

    res.status(201).json({ message: "Supplier account created successfully, role updated to seller" });
  } catch (error) {
    console.error("Error occurred during registration:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Supplier Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Check if user is a supplier
    const supplier = await SupplierModel.findOne({ userId: user._id });
    if (!supplier) return res.status(403).json({ message: "Not a registered supplier" });

    const token = jwt.sign({ id: user._id, role: "supplier" }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Middleware to Protect Supplier Routes
const SupplierAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access denied" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const supplier = await SupplierModel.findOne({ userId: verified.id });
    if (!supplier) return res.status(403).json({ message: "Not authorized" });

    req.supplier = supplier;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Check Seller Role & Unique Phone Number
router.post("/check-seller", async (req, res) => {
  try {
    const { phone } = req.body;

    // Check if the phone number already exists in the database
    const existingUser = await UserModel.findOne({ phone });
    if (existingUser) {
      console.error("Phone number already in use:", phone);
      return res.status(400).json({ message: "Phone number is already in use" });
    }

    res.status(200).json({ message: "User is a seller, phone number is unique" });
  } catch (error) {
    console.error("Check Seller error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get products by sellerId
router.get('/products-by-seller/:sellerId', async (req, res) => {
  try {
    // Fetch the products for the given sellerId
    const products = await ProductModel.find({ sellerId: req.params.sellerId });

    if (!products.length) {
      return res.status(404).json({ message: 'No products found for this seller.' });
    }

    res.json(products);
  } catch (error) {
    console.error('Error fetching products by seller:', error.message);
    res.status(500).json({ message: error.message });
  }
});


// ✅ Export Router & Middleware
export { router as SupplierRouter};
