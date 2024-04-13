const mongoose = require('mongoose');
const { Schema } = mongoose;

const loanSchema = new Schema({
 name: {
    type: String,
    required: true
 },
 type: {
    type: String,
    enum: ['home', 'student', 'personal', 'vehicle', 'gold', 'other'],
    required: true
 },
 startDate: {
    type: Date,
    required: true
 },
 endDate: {
    type: Date,
    required: true
 },
 amount: {
    type: Number,
    required: true
 },
 rateOfInterest: {
    type: Number,
    required: true
 }
});

const Loan = mongoose.model('Loan', loanSchema, 'loans');

module.exports = Loan;
