import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    studentIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    overlapScore: {
      type: Number, // % of route overlap
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Match", matchSchema);
