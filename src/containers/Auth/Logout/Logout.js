import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actionCreator from "../../../strore/actions/index";

export class Logout extends Component {
  componentDidMount() {
    this.props.onAuthLogout();
  }
  render() {
    return <Redirect to={"/"} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthLogout: () => {
      dispatch(actionCreator.authLogout());
    },
  };
};

export default connect(null, mapDispatchToProps)(Logout);
