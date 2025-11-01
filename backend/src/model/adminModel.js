import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
  created_At: String,
  updated_At: String,
});

const adminModel = mongoose.model("admindata", adminSchema);

export default adminModel;
