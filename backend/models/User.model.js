import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uniqueUsername: {
      type: String,
      required: true,
      unique: true, // anonymized handle (e.g., student_xyz123)
    },
    email: {
      type: String,
      required: true,
      unique: true, // used only for login
    },
    passwordHash: {
      type: String,
      required: true,
    },
    name: {
      type: String, // optional (not exposed publicly)
    },
  },
  { timestamps: true } // adds createdAt + updatedAt
);

export default mongoose.model("User", userSchema);
