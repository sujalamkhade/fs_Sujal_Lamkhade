import mongoose from "mongoose";

const commuteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    endLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    route: {
      type: [[Number]], // optional polyline [ [lng, lat], [lng, lat] ]
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Enable geospatial queries
commuteSchema.index({ startLocation: "2dsphere" });
commuteSchema.index({ endLocation: "2dsphere" });

export default mongoose.model("Commute", commuteSchema);
