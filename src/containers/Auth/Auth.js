import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.css";
import * as actionCreator from "../../strore/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

export class Auth extends Component {
  state = {
    authForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  };
  authHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.authForm.email.value,
      this.state.authForm.password.value,
      this.state.isSignup
    );
  };
  switchAuthHandler = () => {
    this.setState((state, props) => {
      return { isSignup: !state.isSignup };
    });
  };

  checkValidity(rules, value) {
    let isValid = true;
    if (!rules) {
      return isValid;
    }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedAuthForm = {
      ...this.state.authForm,
      [inputIdentifier]: {
        ...this.state.authForm[inputIdentifier],
        value: event.target.value,
        valid: this.checkValidity(
          this.state.authForm[inputIdentifier].validation,
          event.target.value
        ),
        touched: true,
      },
    };
    //console.log(updatedAuthForm);
    this.setState({ authForm: updatedAuthForm });
  };
  render() {
    const formElementArray = [];
    for (const key in this.state.authForm) {
      formElementArray.push({
        id: key,
        config: this.state.authForm[key],
      });
    }
    let form = formElementArray.map((formElement) => {
      return (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}
        />
      );
    });

    if (this.props.loading) {
      form = <Spinner />;
    }
    let authRedirect = null;

    if (this.props.isAuthenticated && this.props.burgerBuilding) {
      authRedirect = <Redirect to="/checkout" />;
    } else if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />;
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {this.props.error ? <p>{this.props.error.message}</p> : null}
        <form onSubmit={this.authHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthHandler}>
          SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    burgerBuilding: state.burgerBuilder.building,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) => {
      dispatch(actionCreator.auth(email, password, isSignUp));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
