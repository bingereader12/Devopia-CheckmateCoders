const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
 paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'UPI', 'cheque', 'other'],
    required: true
 },
 date: {
    type: Date,
    required: true
 },
 from: {
    type: Schema.Types.ObjectId,
    ref: 'User'
 },
 to: {
    type: Schema.Types.ObjectId,
    ref: 'User'
 },
 amount: {
    type: Number,
    required: true
 }
});

const Transaction = mongoose.model('Transaction', transactionSchema, 'transactions');

module.exports = Transaction;
