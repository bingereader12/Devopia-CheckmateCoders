const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/api/userRoutes");
const transactionRoutes = require("./routes/api/transactionRoutes");
const investmentRoutes = require("./routes/api/investmentRoutes");
const loanRoutes = require("./routes/api/loanRoutes");
const rssParserRoutes = require("./routes/api/rssParserRoutes");

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB_URI, {
    // useNewUriParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/transaction", transactionRoutes);
app.use("/api/user", userRoutes);
app.use("/api/investment", investmentRoutes);
app.use("/api/loan", loanRoutes);
app.use("/api/rss", rssParserRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}`));
