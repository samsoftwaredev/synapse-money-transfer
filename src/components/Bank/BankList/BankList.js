import React, { useState } from "react";

import "./BankList.css";
const BankList = props => {
  const [possibleBanks, setPossibleBanks] = useState([]);
  const [userBank, setUserBank] = useState("fake");
  const searchBankHandler = event => {
    setUserBank(event.target.value);
    let newBankList = props.bankList.filter(bank => {
      return bank.bank_name.toLowerCase().includes(userBank.toLowerCase());
    });

    if (newBankList.length < 70) setPossibleBanks(newBankList);
    else setPossibleBanks([]);
  };
  const bankSelectedHandler = bank => {
    setUserBank(bank.bank_name);
    props.bankSelected(bank);
    setPossibleBanks([]);
  };
  return (
    <div className="BankListContainer">
      <h3 className="BankListTitle GlobalLabel">Select your bank</h3>
      <input
        type="text"
        placeholder="Bank name"
        value={userBank}
        onChange={searchBankHandler}
      />
      <div className="BankListItems">
        {possibleBanks.map(bank => {
          return (
            <div
              className="BankListItem"
              onClick={() => bankSelectedHandler(bank)}
              key={bank.bank_code}
            >
              <div className="BankListItemImgContainer">
                <img
                  className="BankListItemImg"
                  src={bank.horizontal_logo}
                  alt={bank.bank_code}
                />
              </div>
              <p className="BankListItemName">{bank.bank_name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default BankList;
