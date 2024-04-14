const express = require("express");
const router = express.Router();
const Insurance = require("../../models/insurances");
const User = require("../../models/users");
const auth = require("../../middleware/auth");

router.post("/postinsurance",auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      name,
      type,
      startDate,
      endDate,
      premiumAmount,
      coverAmount,
    } = req.body;
    const exists = await Insurance.findOne({ name });
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User doesnt exist" });
    }
    if (exists)
      return res.status(400).json({ message: "Insurance already exists" });

    const insurance = new Insurance({
      userId,
      name,
      type,
      startDate,
      endDate,
      premiumAmount,
      coverAmount,
    });
    const insuranceRes = await insurance.save();
    user.insurance.push(insuranceRes._id);
    await user.save();

    res.status(200).json({ message: "Insurance added" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/getinsurance", auth, async (req, res) => {
  try {
    const  userId  = req.user.userId;
    console.log(userId);
    const insurances = await Insurance.find({ userId });
    return res.status(200).json({ message: insurances });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const insuranceId = req.params.id;
    const userId = req.user.userId;
    const insurance = await Insurance.findById(insuranceId);
    if (!insurance) {
      return res.status(404).json({ message: "insurance not found" });
    }

    if (insurance.userId != userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this insurance" });
    }

    const deletedInsurance = await Insurance.findByIdAndDelete(insuranceId);

    if (!deletedInsurance) {
      return res.status(404).json({ message: "insurance not found" });
    }

    const user = await User.findById(userId);
    user.insurance.pull(deletedInsurance._id);
    await user.save();

    return res.status(200).json({ message: "Insurance deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
