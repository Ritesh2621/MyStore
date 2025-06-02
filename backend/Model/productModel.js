import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
  },
  subsubcategory: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  reviews: [
    {
      type: String,
    },
  ],
  sellername: {
    type: String,
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,  // Link to the user who is selling this product
    ref: 'User',  // Assuming you have a 'User' model to associate with
    // required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  warrantyInformation: {
    type: String,
    required: true,
  },
  shippingInformation: {
    type: String,
    required: true,
  },
    // ✅ Newly added fields
  availability: {
    type: String,
    enum: ['Coming Soon', 'Available', 'Out of Stock'],
    default: 'Unavailable',
  },
  trusted: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No',
  },
});

export const ProductModel = mongoose.model("Product", productSchema);
