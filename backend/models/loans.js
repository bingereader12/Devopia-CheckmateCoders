const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const loanSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true
 },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["home", "student", "personal", "vehicle", "gold", "other"],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  //  endDate: {
  //     type: Date,
  //     required: true
  //  },
  amount: {
    type: Number,
    required: true,
  },
  rateOfInterest: {
    type: Number,
    required: true,
  },
});

const Loan = mongoose.model("Loan", loanSchema, "loans");

module.exports = Loan;
