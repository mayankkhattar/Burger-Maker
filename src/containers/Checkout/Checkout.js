import React, { Component } from "react";
import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";
import ContactData from "./ContactData/ContactData";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

class Checkout extends Component {
  checkOutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  checkOutCancelledHandler = () => {
    this.props.history.goBack();
  };
  render() {
    let summary = <Redirect to={"/"} />;
    if (this.props.ing) {
      const purchaseRedirect = this.props.purchased ? (
        <Redirect to={"/"} />
      ) : null;
      summary = (
        <div>
          {purchaseRedirect}
          <CheckOutSummary
            ingredients={this.props.ing}
            checkOutCancelledHandler={this.checkOutCancelledHandler}
            checkOutContinueHandler={this.checkOutContinueHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}
const mapStateToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};
export default connect(mapStateToProps)(Checkout);
