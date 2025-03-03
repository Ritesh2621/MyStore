import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  tokenNumber: { type: Number, required: true },
  customer: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  products: [
    {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Add sellerId
    }
  ],
  totalAmount: { type: Number, required: true },
  orderStatus: {
    type: String,
    enum: ['pending', 'shipped', 'delivered'],
    default: 'pending',
  },
  orderDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const OrderModel = mongoose.model("Order", OrderSchema);
