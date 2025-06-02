import mongoose from 'mongoose';

const SupplierSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true, // One user can register only once as a supplier
    },
    uinNumber: { type: String },
    gstNumber: { type: String, required: false }, // Optional
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    city: { type: String, required: true },
    bankAccount: { type: String, required: true },
    ifsc: { type: String, required: true },
    bankName: { type: String, required: true },
    upiId: { type: String, required: false },
    businessName: { type: String, required: true },
    businessType: { type: String, required: true },
    contactNumber: { type: String, required: true },
    productCategory: { type: String, required: true },
  },
  { timestamps: true }
);

// Optional: Remove index if "email" was previously indexed
SupplierSchema.index({ email: 1 }, { sparse: true }); // Safe if you ever add optional emails

export const SupplierModel = mongoose.model("supplier", SupplierSchema);
