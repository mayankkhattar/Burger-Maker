import React, { Fragment } from "react";
import classes from "./Backdrop.css";
const Backdrop = (props) => {
  return (
    <Fragment>
      {props.show ? (
        <div className={classes.Backdrop} onClick={props.clicked}></div>
      ) : null}
    </Fragment>
  );
};

export default Backdrop;
