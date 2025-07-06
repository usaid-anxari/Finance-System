import User from "../models/User.js";
import jwt from "jsonwebtoken";

// ------- Generate Token ---------

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// ------- Register User ---------
export const registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  // validation
  if (!fullName || !email || !password) {
    return res.json({ status: 400, message: "All fields are required" });
  }

  try {
    // Check Email Existens
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create User
    const newUser = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: newUser._id,
      user: newUser,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Register Controller Error", Error: error.message });
  }
};

// ------- Login User ---------
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All filed are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Login Controller Error", Error: error.message });
  }
};

// ------- Get User ---------
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Get User Controller Error", Error: error.message });
  }
};

// ------- Profile Uploader ---------
export const uploadProfile = (req, res) => {
  if (!req.file) {
    return res.status(404).json({ message: "No file uploaded" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`.replace(/\s+/g, '');

  res.status(200).json({imageUrl})
};
