const express = require("express");
const router = express.Router();
const Investment = require("../../models/investments");
const User = require("../../models/users");

router.post("/", async (req, res) => {
  try {
    const { userId, name, type, date, currentValue, initialValue } = req.body;
    const exists = await Investment.findOne({ name });
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User doesnt exist" });
    }
    if (exists)
      return res.status(400).json({ message: "Investment already exists" });

    const investment = new Investment({
      userId,
      name,
      type,
      date,
      currentValue,
      initialValue,
    });
    const investmentRes = await investment.save();
    user.investments.push(investmentRes._id);

    await user.save();

    res.status(200).json({ message: "Investment added" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { userId } = req.body;
    const investments = await Investment.find({ userId });
    return res.status(400).json({ message: investments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const investmentId = req.params.id;
    const userId = req.body.userId;
    const investment = await Investment.findById(investmentId);
    if (!investment) {
      return res.status(404).json({ message: "Investment not found" });
    }

    if (investment.userId != userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this investment" });
    }

    return res.status(200).json({ investment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const investmentId = req.params.id;
    const userId = req.body.userId;
    const investment = await Investment.findById(investmentId);
    if (!investment) {
      return res.status(404).json({ message: "Investment not found" });
    }

    if (investment.userId != userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this investment" });
    }

    const deletedInvestment = await Investment.findByIdAndDelete(investmentId);

    if (!deletedInvestment) {
      return res.status(404).json({ message: "Investment not found" });
    }

    const user = await User.findById(userId);
    user.investments.pull(deletedInvestment._id);
    await user.save();

    return res.status(200).json({ message: "Investment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
