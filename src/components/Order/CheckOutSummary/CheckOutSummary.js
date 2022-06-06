import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckOutSummary.css";
const CheckOutSummary = (props) => {
  return (
    <div className={classes.CheckOutSummary}>
      <h1>We Hope it tastes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkOutCancelledHandler}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkOutContinueHandler}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckOutSummary;
