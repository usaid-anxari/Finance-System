import React, { useEffect, useState } from "react";
import { prepareExpenseChartData } from "../../utils/helper";
import CustomBarChart from "../../components/Charts/CustomBarChart";

const Last30DaysTransaction = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseChartData(data);
    setChartData(result);

    return () => {};
  }, []);

  return (
    <div className="card col-span-1">
      <div className="flex  items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expense</h5>
      </div>
      <CustomBarChart data={chartData} />
    </div>
  );
};

export default Last30DaysTransaction;
