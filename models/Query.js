import mongoose from "mongoose";

const QuerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    maxlength: [100, "Name cannot be more than 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, "Please provide a phone number"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "Please provide a city"],
    trim: true,
  },
  message: {
    type: String,
    required: [true, "Please provide a message"],
    trim: true,
    maxlength: [2000, "Message cannot be more than 2000 characters"],
  },
  source: {
    type: String,
    default: "contact-form",
  },
}, {
  timestamps: true,
});

export default mongoose.models.Query || mongoose.model("Query", QuerySchema);
