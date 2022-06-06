import axios from "../../axios-orders";
import * as actionTypes from "../actions/actionTypes";

const purchaseBurgerSuccess = (id) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
  };
};

const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("./orders.json?auth=" + token, orderData)
      .then((res) => {
        //console.log(res.data);
        dispatch(purchaseBurgerSuccess());
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const initPurchase = () => {
  return {
    type: actionTypes.INIT_PURCHASE,
  };
};

const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};
const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/orders.json" + queryParams)
      .then((res) => {
        //console.log(res.data);
        const fetchOrders = Object.keys(res.data).map((orderKey) => {
          return { ...res.data[orderKey], id: orderKey };
        });
        dispatch(fetchOrdersSuccess(fetchOrders));
        //console.log(fetchOrders);
      })
      .catch((error) => {
        dispatch(fetchOrdersFail(error));
      });
  };
};
