import React, { useEffect, useState } from "react";
import { prepareIncomeChartData } from "../../utils/helper";
import { LuPlus } from "react-icons/lu";
import CustomBarChart  from "../Charts/CustomBarChart"

const IncomeOverview = ({ transaction, onAddIncome }) => {
  console.log(transaction.data);
  
  const [chartData, setChartData] = useState([]);
  console.log(chartData);
  
  useEffect(() => {
    const result = prepareIncomeChartData(transaction?.data||[]);
    console.log(result);
    
    setChartData(result);
    return () => {};
  }, [transaction]);

  return (
    <div className="card">
      <div className=" flex items-center justify-between ">
        <div className="">
          <h5 className="text-lg ">Income Overview</h5>
          <p className="text-xs text-gray-500">Track your earings</p>
        </div>

        <button className="add-btn" onClick={onAddIncome} >
            <LuPlus className="text-lg" />
            Add Income
        </button>
      </div>

      <div className="mt-10">
         <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
