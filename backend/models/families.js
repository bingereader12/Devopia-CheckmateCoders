const mongoose = require("mongoose");
const { Schema } = mongoose;

const familySchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  familyCode: {
    type: String,
    required: true,
  },
  masterId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Family = mongoose.model("Family", familySchema, "families");

module.exports = Family;
