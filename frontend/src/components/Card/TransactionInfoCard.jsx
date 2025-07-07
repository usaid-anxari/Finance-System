import React from "react";
import {
  LuUtensils,
  LuTrendingDown,
  LuTrendingUp,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
  name,
  quantity,
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
}) => {
  const getAmountStyles = () =>
    type === "income"
      ? " bg-green-50 text-green-500 "
      : "bg-red-50 text-red-500";

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-4 rounded-lg hover:bg-gray-100/60">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {icon ? (
          <img src={icon} alt={title} className="h-6 w-6" />
        ) : (
          <LuUtensils />
        )}
      </div>
      <div className="flex-1 flex items-center justify-between ">
        <div className="flex gap-4">
          <p className="text-l text-gray-700 font-medium">{name}</p>
          <p className="text-sm text-gray-700 font-medium">{title}</p>
          <p className="text-sm text-gray-700 font-medium">{quantity}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>
        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={onDelete}
            >
              {" "}
              <LuTrash2 />
            </button>
          )}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
          >
            <h6 className="text-xs font-medium">
              {type === "income" ? "+" : "-"} ${amount}
            </h6>
            {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
