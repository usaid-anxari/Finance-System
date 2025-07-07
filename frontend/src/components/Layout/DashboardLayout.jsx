import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ activeMenu,children }) => {
  const { user } = useContext(UserContext);
  console.log(user);  
  
  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="max-[1020px]:hidden">
            <Sidebar activeMenu={activeMenu} />
          </div>
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
