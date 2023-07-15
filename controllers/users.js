import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

import UserModal from "../models/userSchema.js";

// const secret = 'test';

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserModal.findOne({ email });

    if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id },process.env.TOKEN_KEY, { expiresIn: "1h" });
    
    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const register = async (req, res) => {
  const { email, password, fullName, confirmPassword } = req.body;

  try {
    const existingUser = await UserModal.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    if(password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" });
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, name: `${fullName}` });
    
    const token = jwt.sign( { email: result.email, id: result._id },process.env.TOKEN_KEY, { expiresIn: "1hr" } );
    res.status(201).json({ result, token });
    
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};