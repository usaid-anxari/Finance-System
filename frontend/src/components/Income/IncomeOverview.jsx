import React, { useEffect, useState } from "react";
import { prepareIncomeChartData } from "../../utils/helper";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeChartData(transactions || []);

    setChartData(result);
    return () => {};
  }, [transactions]);

  return (
    <div className="card">
      <div className=" flex items-center justify-between ">
        <div className="">
          <h5 className="text-lg ">Income Overview</h5>
          <p className="text-xs text-gray-500">Track your earings</p>
        </div>

        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>

      {/* <div className="mt-10"><CustomBarChart data={chartData} /></div> */}
    </div>
  );
};

export default IncomeOverview;
