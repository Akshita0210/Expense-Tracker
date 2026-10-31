const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    icon: {
      type: String,
    },
    source: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", IncomeSchema);


// ref: "User" tells Mongoose that this field stores a reference to a document in another collection
// type: mongoose.Schema.Types.ObjectId — says this field holds a MongoDB ObjectId (the unique _id every document gets automatically,
// ref: "User" — tells Mongoose which collection/model that ObjectId belongs to.