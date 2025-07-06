import mongoose, { isValidObjectId, Types } from "mongoose";
import Income from "../models/Income.js";
import Expense from "../models/Expense.js";

export const gatDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // Fetching Total Expense & Income
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // console.log("Total Income", {
    //   totalIncome,
    //   userId: isValidObjectId(userId),
    // });

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // console.log("Total Expense", {
    //   totalExpense,
    //   userId: isValidObjectId(userId),
    // });

    // Get income transction last 60 days
    const incomeLast60Days = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // Get total income from last 60 days
    const totalIncomeLast60Days = incomeLast60Days.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Get expense transction last 30 days
    const expenseLast30Days = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // Get total expense from last 60 days
    const totalExpenseLast30Days = expenseLast30Days.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Last 5 transction (income + expense)
    const lastTransaction = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "income",
        })
      ),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "expense",
        })
      ),
    ].sort((a, b) => b.date - a.date);

    // last response
    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpense: {
        total: expenseLast30Days,
        transaction: totalExpenseLast30Days,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transaction: totalIncomeLast60Days,
      },
      recentTransctions: lastTransaction,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
