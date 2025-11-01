import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  post: String,
  email: String,
  password: String,
  created_At: String,
  updated_At: String,
});

const userModel = mongoose.model("userData", userSchema);

export default userModel;