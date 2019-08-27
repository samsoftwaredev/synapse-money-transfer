import React from "react";

import "./BankAccounts.css";
import AccountInformation from "../AccountInformation/AccountInformation";
const BankAccounts = props => {
  return (
    <div className="BankAccountsContainer">
      {props.bankAccs.length > 0 ? (
        <div className="BankAccountsTitle GlobalSubtitle">
          Select a default account:
        </div>
      ) : (
        <div className="BankAccountsTitle GlobalSubtitle">
          You have no accounts
        </div>
      )}
      <div className="BankAccountsItems">
        {props.bankAccs.map(acc => {
          return (
            <div
              className="BankAccountsItem"
              onClick={() => props.accountSelected(acc)}
              key={acc._id}
            >
              <AccountInformation accInfo={acc} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default BankAccounts;
