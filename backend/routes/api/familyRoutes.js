const express = require("express");
const router = express.Router();
const User = require("../../models/users");
const Family = require("../../models/families");

router.get("/all/:code", async (req, res) => {
  try {
    const familyCode = req.params.code;
    const family = await Family.findOne({ familyCode });
    if (!family) res.status(400).json({ message: "Family not found" });
    res.status(200).json(family);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/join", async (req, res) => {
  try {
    const { familyCode, userId } = req.body;
    const response = await Family.findOne({ familyCode });
    if (response) {
      response.users.push(userId);
      await response.save();
      return res.status(200).json({ response });
    }
    const familyData = {
      users: [userId],
      familyCode: familyCode,
      masterId: userId,
    };
    const family = new Family(familyData);
    await family.save();

    res.status(200).json({ family });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
