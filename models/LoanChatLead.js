import mongoose from "mongoose";

const LoanChatLeadSchema = new mongoose.Schema({
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
    loanType: {
        type: String,
        required: [true, "Please provide a loan type"],
        trim: true,
    },
    source: {
        type: String,
        default: "loan-chatbot",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.LoanChatLead || mongoose.model("LoanChatLead", LoanChatLeadSchema);
