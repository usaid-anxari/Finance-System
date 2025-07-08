import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { IoMdCard } from "react-icons/io";
import { LuWalletMinimal, LuHandCoins } from "react-icons/lu";
import InfoCard from "../../components/Card/InfoCard";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransaction from "../../components/Dashboard/ExpenseTransaction";
import Last30DaysTransaction from "./Last30DaysTransaction";
import RecentIncomeChart from "../../components/Dashboard/RecentIncomeChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";

const Home = () => {
  useUserAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log(error, "Failed Data feching");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-green-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 ">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

          <ExpenseTransaction
            transactions={dashboardData?.last30DaysExpense?.transaction || []}
            onSeeMore={() => navigate("/expense")}
          />

          {/* <Last30DaysTransaction
            data={dashboardData?.last30DaysExpense?.transaction || []}
          /> */}

          <RecentIncomeChart
            data={
              dashboardData?.last60DaysIncome?.transaction.slice(0, 4) || []
            }
            totalIncome={dashboardData?.totalIncome || 0}
          />

          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transaction || []}
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
