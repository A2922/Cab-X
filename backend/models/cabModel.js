// models/cabModel.js
import mongoose from "mongoose";

const cabSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    pricePerMinute: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    // Add any other fields relevant to your Cab model
});

const Cab = mongoose.model("Cab", cabSchema);

export default Cab;
