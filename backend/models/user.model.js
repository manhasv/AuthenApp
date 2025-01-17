import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    lastLogin: { 
        type: Date, 
        default: Date.now 
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    },
    nationalID: { 
        type: String, 
        required: false 
    },
    phoneNumber: { 
        type: String, 
        required: false 
    },
    dob: {
        type: Date,
        required: false
    },
    role: {
        type: String,
        enum: ["user", "admin", "doctor"],
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpireaAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);