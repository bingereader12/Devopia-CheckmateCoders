const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const insuranceSchema = new Schema({
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
    enum: ["property", "health", "life", "vehicle", "other"],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  premiumAmount: {
    type: Number,
    required: true,
  },
  coverAmount: {
    type: Number,
    required: true,
  },
});

const Insurance = mongoose.model("Insurance", insuranceSchema, "insurances");

module.exports = Insurance;
