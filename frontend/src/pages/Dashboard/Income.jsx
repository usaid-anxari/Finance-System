import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { useUserAuth } from "../../hooks/useUserAuth";
import Modal from "../../components/Layout/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import { toast } from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";

const Income = () => {
  useUserAuth();
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeletAlert, setOpenDeletAlert] = useState([
    { show: false, data: null },
  ]);
  // console.log(incomeData);

  const fetchIncomeData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_INCOME}`
      );
      // console.log(response.data);

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Plase try again", error);
    } finally {
      setLoading(false);
    }
  };
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source.trim()) {
      toast.error("Source is required. ");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount Should be a  valid Number");
      return;
    }

    if (!date) {
      toast.error("Date is required");
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModel(false);
      toast.success("Income Added Successfully");
      fetchIncomeData();
    } catch (error) {
      console.error("Added Income Error", error.response?.data?.message||error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeletAlert({ show: false, data: null });
      toast.success("Income Deleted Successfully");
      fetchIncomeData();
    } catch (error) {
      console.error("Delete Income Error", error.response?.data?.message||error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME_REPORT,{
        responseType:"blob"
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download","income_details.xlsx")
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    }  catch (error) {
      toast.error("Failed to download")
      console.error("Delete Income Report Error", error.response?.data?.message||error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomeData();

    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-col-1 gap-6">
          <div>
            <IncomeOverview
              transactions={incomeData.income}
              onAddIncome={() => setOpenAddIncomeModel(true)}
            />
          </div>
          <IncomeList
            transactions={incomeData.income}
            onDelete={(id) => setOpenDeletAlert({ show: true, data: id })}
            onDownload={handleDownloadReport}
          />
        </div>
        <Modal
          isOpen={openAddIncomeModel}
          onClose={() => setOpenAddIncomeModel(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
        <Modal
          isOpen={openDeletAlert.show}
          onClose={() => setOpenDeletAlert({ show: false, data: null })}
          title={"Delete Income"}
        >
          <DeleteAlert
            content="are you sure?"
            onDelte={() => handleDeleteIncome(openDeletAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
