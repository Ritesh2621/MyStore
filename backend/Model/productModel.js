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
  subcategory:{
  type:String
  },
  subsubcategory:{
   type:String
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
    }
  ],
  reviews:[
    {
      type:String
    }
  ],
  sellername:{
    type:String,
    required:true
  },
  quantity:{
    type:String,
    required:true
  },
  warrantyInformation: {
    type:String,
    required:true
  },
  shippingInformation:{
      type:String,
      required:true
  },
});

export const ProductModel = mongoose.model("Product", productSchema);
