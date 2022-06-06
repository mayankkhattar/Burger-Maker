import React, { Component, Fragment } from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.css";
class Modal extends Component {
  //convert it to class basesd component just to use shouldComponentUpdate

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }
  render() {
    return (
      <Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
          className={classes.Modal}
        >
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}

export default Modal;
