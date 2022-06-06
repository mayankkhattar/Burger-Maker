import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Layout from "./hoc/Layout/Layout";
import * as actionCreator from "./strore/actions/index";
//const Auth = React.lazy(() => import("./containers/Auth/Auth"));
const AsyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});
const AsyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});
const AsyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});

class App extends Component {
  componentDidMount() {
    this.props.onAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={AsyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={AsyncCheckout} />
          <Route path="/orders" component={AsyncOrders} />
          <Route path="/auth" component={AsyncAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoSignup: () => dispatch(actionCreator.authCheckOut()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
