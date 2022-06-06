import axios from "../../axios-orders";
import React, { Component } from "react";
import Order from "../../components/Order/Order";
import withErrorHandling from "../../hoc/withErrorHandling/withErrorHandling";
import { connect } from "react-redux";
import * as actionCreators from "../../strore/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

export class Orders extends Component {
  state = {
    loading: true,
    orders: [],
  };
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }
  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
    return orders;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actionCreators.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandling(Orders, axios));
