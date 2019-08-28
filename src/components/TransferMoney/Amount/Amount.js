import React, { useState } from "react";

import "./Amount.css";
import Button from "../../UI/Button/Button";
const Amount = props => {
  const [amount, setAmount] = useState(50.0);
  const inputChangeHandler = event => {
    setAmount(event.target.value);
  };
  return (
    <div>
      <p className="TransferMoneySubtitle GlobalLabel">To: {props.userName}</p>
      <p className="TransferMoneySubtitle GlobalLabel">Enter Amount:</p>
      <input
        type="number"
        placeholder="$50.00"
        value={amount}
        onChange={event => inputChangeHandler(event)}
      />
      <Button clicked={event => props.transferMoney(event, amount)}>
        Send Money
      </Button>
    </div>
  );
};
export default Amount;
