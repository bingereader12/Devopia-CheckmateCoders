const express = require("express");
const router = express.Router();
const User = require("../../models/users");
const Session = require("../../models/sessions");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

router.post("/signup", async (req, res) => {
  try {
    const { fname, lname, email, password, dob, phone, marital, income, bank } =
      req.body;
    const existingUser = await User.findOne({ phone });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      fname,
      lname,
      email,
      password: hashedPassword,
      dob,
      phone,
      maritalStatus: marital,
      avgMonthlyIncome: income,
      bank,
    });
    await user.save();

    // Send a success response back to the client
    res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/user/details", async (req, res) => {
  try {
    const userId = req.body.userId; 

    // Retrieve user details based on userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract required information
    const { netWorth, wealthHealth, savings } = user;

    // Prepare response
    const responseBody = {
      netWorth,
      wealthHealth,
      savings,
    };

    // Send response to the client
    res.status(200).json(responseBody);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post("/login",auth, async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(`Received email: ${email}`);
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "Invalid email or password email not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res
        .status(400)
        .json({ message: "Invalid email or password password doesnt match" });

    const token = jwt.sign({ userId: user._id }, "your_secret_key");
    const sessionId = uuidv4();

    const existingSession = await Session.findOne({ userId: user._id });

    if (existingSession) {
      // Invalidate the existing session
      await Session.deleteOne({ userId: user._id });
    }
    const newSession = new Session({
      userId: user._id,
      sessionId,
    });
    await newSession.save();

    const responseBody = {
      "x-auth-token": token, // Include the token
      "x-session-id": sessionId, // Include the session ID
    };

    res.status(200).json(responseBody);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
