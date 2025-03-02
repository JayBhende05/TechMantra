import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  username: String,
  password: String,
});

export default mongoose.model("Admin", adminSchema);
