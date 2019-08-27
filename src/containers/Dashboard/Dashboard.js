import React from "react";

import "./Dashboard.css";
import Bank from "../../components/Bank/Bank";
import Profile from "../../components/Profile/Profile";
import TransferMoney from "../../components/TransferMoney/TransferMoney";
const Dashboard = () => {
  return (
    <div>
      {/* <Bank /> */}
      <Profile />
      {/* <TransferMoney /> */}
    </div>
  );
};
export default Dashboard;
