const mongoose = require('mongoose');
const { Schema } = mongoose;

const familySchema = new Schema({
    users: [
        {
        type: Schema.Types.ObjectId,
        ref: "User",
        },
    ],
    masterId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model('Family', familySchema,'families');
