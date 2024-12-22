import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    },
    nationalID: { 
        type: String, 
        required: true 
    },
    phoneNumber: { 
        type: String, 
        required: true 
    },
    dob: {
        type: Date,
        required: true
    },
    symptoms: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    morningOrAfternoon: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: 0
    }
    
}, { timestamps: true });

export const Appointment = mongoose.model("Appointment", appointmentSchema);