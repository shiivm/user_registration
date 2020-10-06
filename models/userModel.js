const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type : Schema.Types.ObjectId,
      ref : 'userRole',
      required : true
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = User = mongoose.model("users", userSchema);
