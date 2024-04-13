const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  familyCode: {
    type: String,
    required: false
  },
  dob: {
    type: Date,
    required: true,
  },
  maritalStatus: {
    type: String,
    enum: ["married", "single"],
    required: true,
  },
  avgMonthlyIncome: {
    type: Number,
    required: true,
  },
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
  investments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Investment",
    },
  ],
  loans: [
    {
      type: Schema.Types.ObjectId,
      ref: "Loan",
    },
  ],
  insurance: [
    {
      type: Schema.Types.ObjectId,
      ref: "Insurance",
    },
  ],
  savings: {
    type: Number,
    default: 45000,
    required: false,
  },
  bank: {
    type: String,
    enum: ["Kotak Mahindra", "SBI", "HDFC", "Devopia", "ICICI"],
    required: true,
  },
  netWorth: {
    type: Number,
    default: 45000,
    required: false,
  },
  wealthHealth: {
    type: String,
    default: "",
    required: false,
  },
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
