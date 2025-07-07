import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";

const Income = () => {
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeletAlert, setOpenDeletAlert] = useState([
    { show: false, data: null },
  ]);
  console.log(incomeData);
  
  const fetchIncomeData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_INCOME}`
      );
      console.log(response.data);
      
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Plase try again",error);
    }finally{
      setLoading(false)
    }
  };
  const handleAddIncome = async () => {};
  const handleDeleteIncome = async () => {};
  const handleDownloadReport = async () => {};


   useEffect(()=>{
    fetchIncomeData();

    return ()=>{}
   },[])
  return (
    <DashboardLayout activeMune="Income">
      <div className="my-5 mx-auto ">
        <div>
          <IncomeOverview
            transaction={incomeData}
            onAddIncome={() => setOpenAddIncomeModel(true)}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Income;
