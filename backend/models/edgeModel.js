import mongoose from "mongoose";

const edgeSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

const Edge = mongoose.model("Edge", edgeSchema);

export default Edge;
