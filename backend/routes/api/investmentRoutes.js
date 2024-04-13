const express = require("express");
const router = express.Router();
const Investment = require("../../models/investments");

router.post("/", async (req, res) => {
  try {
    const { userId, name, type, date, currentValue, initialValue } = req.body;
    const exists = await Investment.findOne({ name });
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
    await investment.save();
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
    const { userId } = req.body;
    const investmentId = req.params["id"];
    const investments = await Investment.find({ userId });
    return res.status(400).json({ message: investments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
