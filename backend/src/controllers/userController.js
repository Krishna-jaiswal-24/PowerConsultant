import User from "../models/user.js";
import AttendanceDetails from "../models/attendance.js";
import MinWages from "../models/minWages.js";

import bcrypt from "bcrypt";

const createUser = async (req, res) => {
  const {
    username,
    password,
    name,
    phone,
    email,
    guardianName,
    address,
    actualGrossSalary,
    dob,
    joiningDate,
    sex,
    workCategory,
    designation,
  } = req.body;
  if (!username || !password || !name || !phone || !email) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all fields",
    });
  }
  const userExists = await User.findOne({ username: username, email: email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  console.log(req.body);

  const minWage=await MinWages.findOne({category:workCategory,industry:designation});
    console.log(minWage);
    if(!minWage){
      return res.status(400).json({
        success: false,
        message: "MinWage not found",
      });
    }
    const wage=minWage.perDay;
  try {
    const newUser = new User({
      username,
      password: hashedPassword,
      name,
      email,
      phone,
      guardianName,
      address,
      actualGrossSalary,
      dob,
      joiningDate,
      sex,
      workCategory,
      designation,
      wage:wage
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error creating user",
      error: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all fields",
    });
  }
  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User does not exist",
    });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      success: false,
      message: "Invalid password",
    });
  }
  res.status(200).json({
    success: true,
    message: "Login successful",
    data: user,
  });
};

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) {
    return res.status(400).json({
      success: false,
      message: "No user found",
    });
  }

  const mappedUser = users.map((user) => {
    return {
      username: user.username,
      email: user.email,
      name: user.name,
      phone: user.phone,
    };
  });

  res.status(200).json({
    success: true,
    message: "Users found",
    data: users,
  });
};

const addDetails = async (req, res) => {
  const { userId, date, dutyType, dutyHours, otHours, siteLocation, remark , client} =
    req.body;

  // Check if required fields are provided
  if (!userId || !date || !dutyType) {
    console.log("Missing required fields");
    return res
      .status(400)
      .json({ error: "userId, date, and dutyType are required" });
  }

  try {
    const newDetails = new AttendanceDetails({
      userId,
      date,
      dutyType,
      dutyHours,
      otHours,
      siteLocation,
      remark,
      client
    });
    await newDetails.save();
    res.status(201).json({
      message: "Details added successfully",
      success: true,
      data: newDetails,
    });
  } catch (error) {
    console.error("Error saving details:", error);
    res.status(400).json({ error: error.message });
  }
};

export { createUser, loginUser, getAllUsers, addDetails };
