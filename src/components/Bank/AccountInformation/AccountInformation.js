import React from "react";

import "./AccountInformation.css";
const AccountInformation = props => {
  return (
    <div className="AccountInformationContainer">
      <div className="AccountInformation">
        <h3 className="AccountInformationName">
          {props.accInfo.info.nickname}
        </h3>
        <p className="AccountInformationType">
          {props.accInfo.info.type} {props.accInfo.info.class}
        </p>
        <p className="AccountInformationData">
          {props.accInfo.info.balance.amount}{" "}
          {props.accInfo.info.balance.currency}
        </p>
      </div>
    </div>
  );
};
export default AccountInformation;
