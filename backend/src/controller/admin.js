import adminModel from "../model/adminModel.js";
import {DateTime} from "luxon"

export const adminsignup = async (req, res) => {
  const { email, password } = req.body;
  const email_Lower = email.toLowerCase().trim();
  try {
    if (!email.trim() || !password.trim()) {
      res.status(400).json({ message: "All field are required" });
      return;
    }

    const user = await adminModel.findOne({ email: email_Lower });

    const result = await adminModel.create({
      email: email_Lower,
      password,
      created_At: DateTime.now().toISO(),
      updated_At: DateTime.now().toISO(),
    });
    res.status(200).json({ message: "admin signup successfully", result });
  } catch (error) {
    res.status(500).json({ message: `error occured ${error}` });
  }
};

export const adminsignin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email.trim() || !password.trim()) {
      res.status(400).json({ message: "All field are required" });
      return;
    }

    const user = await adminModel.findOne({email});

    if (!user) {
      res.status(400).json({ message: "admin not exist" });
      return;
    }
    if (user?.password != password) {
      res.status(400).json({ message: "invalid password" });
      return;
    }

    res.status(200).json({ message: "admin signin successfully", user });
  } catch (error) {
    res.status(500).json({ message: `error occured ${error}` });
  }
};
