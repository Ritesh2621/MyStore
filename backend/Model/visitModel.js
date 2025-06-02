import mongoose from 'mongoose';

const VisitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  mobileNumber: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  },
  product: {
    type: String,
    default: null
  },
  location: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

export const VisitModel = mongoose.model("visit", VisitSchema);
