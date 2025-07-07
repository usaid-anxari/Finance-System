import React, { useState } from "react";
import Input from "../Input/Input";
import EmojiPickerPopup from "../Input/EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    quantity: "",
    name: "",
    icon: "",
    amount: "",
    date: "",
  });

  const handleChange = (key, value) => setExpense({ ...expense, [key]: value });
  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectIcon) => handleChange("icon", selectIcon)}
      />
      <Input
        value={expense.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Name"
        placeholder="Supplier,Worker, etc"
        type="text"
      />
            <Input
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Expense category"
        placeholder="Wages,Payment,etc"
        type="text"
      />
      <Input
        value={expense.quantity}
        onChange={({ target }) => handleChange("quantity", target.value)}
        label="quantity"
        placeholder="Quantity"
        type="number"
      />
      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="$Amount"
        type="number"
      />
      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
