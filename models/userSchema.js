import mongoose, { Schema, Types } from "mongoose";


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is must need"],
            trim: true,
            minlength: [2, "name must be at least 2 characters"],
            
        },
        email: {
            type: String,
            required: [true, "email is required"],
            trim: true,
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            trim: true,
            minlength: [6, "minimum 6 length char is required"],
            required: [true, "Password is required"],
        }
    }, { timestamps: true }
);
const User = mongoose.model("User", userSchema)
export default User;