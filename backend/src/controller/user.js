// import adminModel from "../model/adminModel.js";
// import user from "../model/employeModel.js"
import userModel from "../model/employeModel.js";
import { DateTime } from "luxon";

export const userdata = async (req, res) => {
  const { name, post, email, password } = req.body;
  const email_Lower = email.toLowerCase().trim();
  try {
    if (!name.trim() || !post.trim() || !email.trim() || !password.trim()) {
      res.status(400).json({ message: "All field are required" });
      return;
    }

    const user = await userModel.findOne({ email: email_Lower });
    if (user) {
      res.status(400).json({ message: "user already exist" });
      return;
    }

    const result = await userModel.create({
      name,
      post,
      email: email_Lower,
      password,
      created_At: DateTime.now().toISO(),
      updated_At: DateTime.now().toISO(),
    });
    res.status(200).json({ message: "user Data created successfully", result });
  } catch (error) {
    res.status(500).json({ message: `error occured ${error}` });
  }
};

export const deleteUser = async (req, res) => {
  const { user_id } = req.body;
  try {
    const result = await userModel.findByIdAndDelete(user_id);
    res.status(200).json({ message: "user deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: `error occured ${error}` });
  }
};

export const getalluser = async (req, res) => {
  try {
    const result = await userModel.find({});
    const total = result.length;
    res
      .status(200)
      .json({ message: "All user get successfully", result, total });
  } catch (error) {
    res.status(500).json({ message: `error occured ${error}` });
  }
};

export const getSingleUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    if (!user_id) {
      res.status(400).json({ message: "user id not exist" });
      return;
    }

    const result = await userModel.findById(user_id);
    res.status(200).json({ message: "single user get successfully", result });
  } catch (error) {
    res.status(500).json({ message: `error occured ${error}` });
  }
};

export const updateUserData = async (req, res) => {
  const { user_id } = req.params;
  const { name, post, email, password } = req.body;
  const email_Lower = email.toLowerCase().trim();
  try {
    if (!user_id) {
      res.status(400).json({ message: "user id not exist" });
      return;
    }

    const result = await userModel.findByIdAndUpdate(user_id, {
      name,
      post,
      email: email_Lower,
      password,
      updated_At: DateTime.now().toISO(),
    },{
        new:true
    });
    res.status(200).json({ message: "Data Updated successfully", result });
  } catch (error) {
    res.status(500).json({ message: `error occured ${error}` });
  }
};
