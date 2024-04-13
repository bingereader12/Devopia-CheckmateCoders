const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
 fname: String,
 lname: String,
 email: String,
 phone: String,
 dob: Date,
 maritalStatus: String,
 avgMonthlyIncome: Number,
 transactions: [{
    type: Schema.Types.ObjectId,
    ref: 'Transaction'
 }],
 investments: [{
    type: Schema.Types.ObjectId,
    ref: 'Investment'
 }],
 loans: [{
    type: Schema.Types.ObjectId,
    ref: 'Loan'
 }],
 insurance: [{
    type: Schema.Types.ObjectId,
    ref: 'Insurance'
 }],
 savings: Number,
 netWorth: Number,
 wealthHealth: String
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;