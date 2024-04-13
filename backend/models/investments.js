const mongoose = require('mongoose');
const { Schema } = mongoose;

const investmentSchema = new Schema({
 name: {
    type: String,
    required: true
 },
 type: {
    type: String,
    enum: ['mutual', 'stocks', 'estate', 'FD', 'PF', 'bonds', 'other'],
    required: true
 },
 date: {
    type: Date,
    required: true
 },
 currentValue: {
    type: Number,
    required: true
 },
 initialValue: {
    type: Number,
    required: true
 }
});

const Investment = mongoose.model('Investment', investmentSchema, 'investments');

module.exports = Transaction;
