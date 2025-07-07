import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { useUserAuth } from "../../hooks/useUserAuth";
import Modal from "../../components/Layout/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import { toast } from "react-hot-toast";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";

const Expense = () => {
  useUserAuth();
  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeletAlert, setOpenDeletAlert] = useState([
    { show: false, data: null },
  ]);
  console.log(expenseData);

  const fetchExpenseData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_EXPENSE}`
      );
      // console.log(response.data);

      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Plase try again", error);
    } finally {
      setLoading(false);
    }
  };
  const handleAddExpense = async (Expense) => {
    const { category,quantity,name, amount, date, icon } = Expense;

    if (!category.trim()) {
      toast.error("Category is required. ");
      return;
    }
    if (!name.trim()) {
      toast.error("Name is required. ");
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
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        name,
        quantity,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModel(false);
      toast.success("Expense Added Successfully");
      fetchExpenseData();
    } catch (error) {
      console.error("Added Expense Error", error.response?.data?.message||error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeletAlert({ show: false, data: null });
      toast.success("Expense Deleted Successfully");
      fetchExpenseData();
    } catch (error) {
      console.error("Delete Expense Error", error.response?.data?.message||error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE_REPORT,{
        responseType:"blob"
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download","expense_details.xlsx")
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    }  catch (error) {
      toast.error("Failed to download")
      console.error("Delete Expense Report Error", error.response?.data?.message||error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenseData();

    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-col-1 gap-6">
          <div>
            <ExpenseOverview
              transactions={expenseData.expanse}
              onAddExpense={() => setOpenAddExpenseModel(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData.expanse}
            onDelete={(id) => setOpenDeletAlert({ show: true, data: id })}
            onDownload={handleDownloadReport}
          />
        </div>
        <Modal
          isOpen={openAddExpenseModel}
          onClose={() => setOpenAddExpenseModel(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>
        <Modal
          isOpen={openDeletAlert.show}
          onClose={() => setOpenDeletAlert({ show: false, data: null })}
          title={"Delete Expense"}
        >
          <DeleteAlert
            content="are you sure?"
            onDelte={() => handleDeleteExpense(openDeletAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
