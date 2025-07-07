import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Card/TransactionInfoCard";
import moment from "moment";

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between ">
        <h5 className="text-lg"> Income Source</h5>
        <button className="card-btn" onClick={onDownload}>
          <LuDownload /> Download
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((items, index) => (
          <TransactionInfoCard
            key={index}
            title={items.source}
            icon={items.icon}
            date={moment(items.date).format("Do MMM YYYY")}
            amount={items.amount}
            type="income"
            onDelete={() => onDelete(items._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
