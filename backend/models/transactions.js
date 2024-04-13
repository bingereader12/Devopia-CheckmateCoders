const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
 type: {
    type: String,
    enum: ['inbound', 'outbound'],
    required: true
 },
 paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'UPI', 'cheque', 'other'],
    required: true
 },
 date: {
    type: Date,
    required: true
 },
 peer: {
    type: String,
    required: false
 },
 amount: {
    type: Number,
    required: true
 }
});

const Transaction = mongoose.model('Transaction', transactionSchema, 'transactions');

module.exports = Transaction;
