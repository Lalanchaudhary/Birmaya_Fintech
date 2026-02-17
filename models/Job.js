import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a job title'],
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    location: {
        type: String,
        required: [true, 'Please provide a location'],
        maxlength: [50, 'Location cannot be more than 50 characters'],
    },
    type: {
        type: String,
        required: [true, 'Please provide a job type'],
        enum: ['Full Time', 'Part Time', 'Contract', 'Internship'],
        default: 'Full Time',
    },
    description: {
        type: String,
        required: [true, 'Please provide a job description'],
    },
    requirements: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Job || mongoose.model('Job', JobSchema);
