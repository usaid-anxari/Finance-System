import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    icon: { type: String },
    name: { type: String ,required:true},
    category: { type: String, required: true },
    quantity:{type:String,required:true},
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
