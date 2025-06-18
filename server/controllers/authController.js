import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all required fields." });
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists with this email." });
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await userModel.create({
    name,
    email, 
    password: hashedPassword
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email
    },
    token
  });
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide both email and password." });
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.status(200).json({
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    },
    token
  });
};

// Assuming user is already authenticated via middleware

const userCredit = async (req, res) => {
  const user = req.user;

  if (user.creditBalance <= 0) {
    return res.status(403).json({ message: "You have no credits left. Please recharge." });
  }

  await user.save();

  res.status(200).json({
    message: "Credit used successfully.",
    remainingCredits: user.creditBalance,
    user: {
      id: user._id, 
      name: user.name,
      email: user.email,
    },
  });
};

// Logout just tells client to remove token
const logoutUser = (req, res) => {
  // If you're not using cookies, you just clear token client-side
  res.status(200).json({ message: 'User logged out successfully' });
};

export { registerUser, loginUser, userCredit, logoutUser };
  