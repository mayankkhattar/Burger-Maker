import axios from "../../axios-orders";
import React, { Component, Fragment } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandling from "../../hoc/withErrorHandling/withErrorHandling";
import { connect } from "react-redux";
import * as actionCreator from "../../strore/actions/index";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };
  componentDidMount() {
    this.props.onInitIngredients();
    //console.log(this.props);
    // axios
    //   .get("/ingredients.json")
    //   .then((res) => {
    //     this.setState({ ingredients: res.data });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //   });
  }
  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.history.push("/auth");
    }
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((prevSum, curr) => {
        return prevSum + curr;
      }, 0);
    return sum > 0;
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = { ...this.props.ing };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ing) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ing} />
          <BuildControls
            ingredientsAdded={this.props.onIngredientsAdded}
            ingredientsRemoved={this.props.onIngredientsRemove}
            ingredientsRemovedAll={this.props.onIngredientsRemoveAll}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ing)}
            ordered={this.purchaseHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
        </Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ing}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.props.price.toFixed(2)}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
          {...this.props}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientsAdded: (ingName) =>
      dispatch(actionCreator.addIngredient(ingName)),
    onIngredientsRemove: (ingName) =>
      dispatch(actionCreator.removeIngredient(ingName)),
    onIngredientsRemoveAll: (ingName) =>
      dispatch(actionCreator.removeAllIngredient(ingName)),
    onInitIngredients: () => dispatch(actionCreator.initIngredients()),
    onInitPurchase: () => dispatch(actionCreator.initPurchase()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandling(BurgerBuilder, axios));
