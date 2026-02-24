import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        trim: true,
        maxlength: [180, "Title cannot be more than 180 characters"],
    },
    slug: {
        type: String,
        required: [true, "Please provide a slug"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    excerpt: {
        type: String,
        required: [true, "Please provide an excerpt"],
        trim: true,
        maxlength: [300, "Excerpt cannot be more than 300 characters"],
    },
    content: {
        type: String,
        required: [true, "Please provide blog content"],
    },
    image: {
        type: String,
        required: [true, "Please provide an image path"],
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
