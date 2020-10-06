const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userRoleSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    created_date: {
      type: Date,
      default: Date.now,
    }
  },
  { versionKey: false }
);

module.exports = UserRole = mongoose.model("user_roles", userRoleSchema);
