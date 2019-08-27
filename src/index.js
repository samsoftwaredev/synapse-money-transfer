import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import bankReducer from "./store/reducers/bank";
import userReducer from "./store/reducers/user";
import authReducer from "./store/reducers/auth";

const rootReducer = combineReducers({
  bank: bankReducer,
  user: userReducer,
  auth: authReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
