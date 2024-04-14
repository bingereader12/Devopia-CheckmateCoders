const express = require("express");
const router = express.Router();
const Loan = require("../../models/loans");
const User = require("../../models/users");
const auth = require("../../middleware/auth");
router.post("/postloan",auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, type, startDate, amount, rateOfInterest } = req.body;
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

router.get("/getloan",auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const loans = await Loan.find({ userId });
    return res.status(200).json({ message: loans });
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
        .json({ message: "You are not authorized to access this Loan" });
    }

    const deletedLoan = await Loan.findByIdAndDelete(loanId);

    if (!deletedLoan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    const user = await User.findById(userId);
    user.loans.pull(deletedLoan._id);
    await user.save();

    return res.status(200).json({ message: "Loan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
