const express = require("express");
const User = require("../models/userModel");
const webToken = require("../webToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Blog = require("../models/blogModel");
const Otp = require("../models/otpModel");
const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");

dotenv.config();

const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  const userAlreadyExist = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error :", err);
    }
  );
  if (userAlreadyExist) {
    res.status(401).json({ message: "User Already Exist" });
  } else {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name,
      email: email,
      password: encryptedPassword,
    });
    // user.save();
    if (user) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: webToken(user.id, user.email),
      });
    } else {
      res.json({ message: "Cannot resgister at the moment" });
    }
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ where: { email } });
  if (userExist) {
    const matchPassword = await bcrypt.compare(password, userExist.password);
    if (!matchPassword) {
      res.status(401).json({ message: "Email or Password not correct" });
    } else {
      res.json({
        id: userExist.id,
        name: userExist.name,
        email: userExist.email,
        token: webToken(userExist.id, userExist.email),
        admin: userExist.isAdmin,
      });
    }
  } else {
    res.status(401).json({ message: "Email or Password not correct" });
    // const user = await User.create({
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog,
        as: "blog",
      },
    ],
  });
  res.json(users);
});

const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const userExist = await User.findOne({ where: { email } });

  if (userExist) {
    const otpCode = Math.floor(1000 + Math.random() * 9000);
    // const otpExp = new Date(new Date().getTime() + 2 * 60 * 1000);
    // const otpExp = new Date().getTime() + 300 * 1000;

    const response = new Otp({
      email: email,
      name: userExist.name,
      otp: otpCode,
      expTime: new Date().getTime() + 300 * 1000,
    });
    // const waitForMailer = await mailer(email, otpCode);

    const otpData = await response.save();
    mailer(email, otpCode);
    // console.log(await mailer(email, otpCode), "mailer");
    res.json(otpData);
  } else {
    res.json({ message: "No user with provided E-mail Address" });
  }
});
const changePassword = asyncHandler(async (req, res) => {
  const { email, otp, password } = req.body;
  const otpDataExist = await Otp.findOne({ where: { email: email, otp: otp } });
  // console.log(otpDataExist, "otp");
  // console.log(otpDataExist.expTime);
  if (otpDataExist) {
    console.log(otpDataExist.expTime, "expTime");
    let currentTime = new Date().getTime();
    const diff = otpDataExist.expTime - currentTime;

    console.log(diff, "diff");
    if (diff > 0) {
      const user = await User.findOne({ where: { email: email } });
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      user.password = hashPassword;
      user.save();
      res.json({ message: "Password has been updated" });
    } else {
      res.json({ message: "OTP Time expired" });
    }
  } else {
    res.json({ message: "Invalid OTP" });
  }
});
const mailer = asyncHandler(async (email, otp) => {
  let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    host: "smtp.gmail.com",
    port: 587,
    service: "gmail",
    secure: false, // true for 465, false for other ports
    auth: {
      user: "abdullahanwar095@gmail.com", // generated ethereal user
      pass: "bpctgckqwjokhlxf", // generated ethereal password
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Password reset OTP", // Subject line
    text: ``, // plain text body
    html: `Your OTP code is ${otp}`, // html body
  });
});

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  sendOtp,
  changePassword,
};
