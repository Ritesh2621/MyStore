import mongoose from 'mongoose';

// Define User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'admin', 'partner','seller'],  
    default: 'user',
  },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});



// Create User Model
export const UserModel = mongoose.model("users", UserSchema);