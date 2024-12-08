import mongoose, { Schema } from "mongoose";
import emailValidator from "email-validator";
import bcrypt from "bcrypt";
import crypto from "crypto";

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    user: {
        type: Schema.ObjectId,
        ref: "userModel",
        required: [true, "review must belong to user"],
    },
    plan: {
        type: Schema.ObjectId,
        ref: "planModel",
        required: [true, "review must belong to plan"],
    },
});
