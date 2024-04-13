const express = require("express");
const router = express.Router();
const Loan = require("../../models/loans");
const User = require("../../models/users");

router.post("/", async (req, res) => {
  try {
    const { userId, name, type, startDate, amount, rateOfInterest } = req.body;
    const exists = await Loan.findOne({ name });
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    if (exists) return res.status(400).json({ message: "Loan already exists" });

    const loan = new Loan({
      userId: user._id,
      name,
      type,
      startDate,
      amount,
      rateOfInterest,
    });
    const loanRes = await loan.save();
    user.loans.push(loanRes._id);
    await user.save();

    res.status(200).json({ message: "Loan added" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { userId } = req.body;
    const loans = await Loan.find({ userId });
    return res.status(400).json({ message: loans });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const loanId = req.params.id;
    const userId = req.body.userId;
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    if (loan.userId != userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this investment" });
    }

    const deletedLoan = await Loan.findByIdAndDelete(loanId);

    if (!deletedLoan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    return res.status(200).json({ message: "Loan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
