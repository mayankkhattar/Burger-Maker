import React, { Fragment } from "react";
import Logo from "../../Logo/Logo";
import Backdrop from "../../UI/Backdrop/Backdrop";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
const SideDrawer = (props) => {
  let attachedClass = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClass = [classes.SideDrawer, classes.Open];
  }
  return (
    <Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClass.join(" ")} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.auth} />
        </nav>
      </div>
    </Fragment>
  );
};

export default SideDrawer;
