import Income from "../models/Income.js";
import xlsx from "xlsx";

// ------ Add Icome ------
export const addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    // Check Fields
    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    // create the income
    const newIncome = await Income.create({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();
    res.status(201).json({ message: "Income Added Successfully", newIncome });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Add Income Controller Error", Error: error.message });
  }
};

// ------ Get Icome ------
export const getIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json({ income });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Get Income Controller Error", Error: error.message });
  }
};

// ------ Delete Icome ------
export const deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Income Deleted Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Delete Income Controller Error",
        Error: error.message,
      });
  }
};

// ------ Download Icome & Expanse Report ------
export const downloadReport = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    //  Prepare Data For excel
   const data = income.map((item)=>({
    Source : item.source,
    Amount : item.amount,
    Date : item.date
   }));

   // Convert Excel
   const wb = xlsx.utils.book_new();
   const ws = xlsx.utils.json_to_sheet(data);
   xlsx.utils.book_append_sheet(wb,ws,"Income");
   xlsx.writeFile(wb,"income_details.xlsx");
   res.download("income_details.xlsx")
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Download Income Controller Error",
        Error: error.message,
      });
  }
};
