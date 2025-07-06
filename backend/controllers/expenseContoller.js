import Expense from "../models/Expense.js";
import Expanse from "../models/Expense.js";
import xlsx from "xlsx";

// ------ Add Expanse ------
export const addExpanse = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, name, category, quantity, amount, date } = req.body;

    // Check Fields
    if (!name || !category || !quantity || !amount || !date) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    // create the Expanse
    const newExpanse = await Expense.create({
      userId,
      icon,
      name,
      category,
      quantity,
      amount,
      date: new Date(date),
    });

    await newExpanse.save();
    res.status(201).json({ message: "Expanse Added Successfully", newExpanse });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Add Expanse Controller Error", Error: error.message });
  }
};

// ------ Get Expanse ------
export const getExpanse = async (req, res) => {
  const userId = req.user.id;

  try {
    const expanse = await Expanse.find({ userId }).sort({ date: -1 });
    res.status(200).json({ expanse });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Get Expanse Controller Error", Error: error.message });
  }
};

// ------ Delete Expanse ------
export const deleteExpanse = async (req, res) => {
  try {
    await Expanse.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expanse Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Delete Expanse Controller Error",
      Error: error.message,
    });
  }
};

// ------ Download Icome & Expanse Report ------
export const downloadReport = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expanse.find({ userId }).sort({ date: -1 });

    //  Prepare Data For excel
    const data = expense.map((item) => ({
      Name: item.name,
      Category: item.category,
      Quantity: item.quantity,
      Amount: item.amount,
      Date: item.date,
    }));

    // Convert Excel
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expanse");
    xlsx.writeFile(wb, "expanse_details.xlsx");
    res.download("expanse_details.xlsx");
  } catch (error) {
    return res.status(500).json({
      message: "Download Expanse Controller Error",
      Error: error.message,
    });
  }
};
