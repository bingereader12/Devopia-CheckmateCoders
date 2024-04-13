const express = require("express");
const router = express.Router();
let Parser = require("rss-parser");
let parser = new Parser({
  customFields: {
    item: [["media:content", "media_content", { keepArray: true }]],
  },
});

router.get("/", async (req, res) => {
  let feed = await parser.parseURL(
    "https://www.business-standard.com/rss/finance/personal-finance-10313.rss"
  );

  return res.status(200).json({ feed });
});

module.exports = router;
