import mongoose from "mongoose";

const registrationSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    class: String,
    event: String,
    type: String,
    participants: [String],
    token: String,
    paymentStatus: { type: String, default: "Pending" }
  },
  { timestamps: true }
);

export default mongoose.model("Registration", registrationSchema);
