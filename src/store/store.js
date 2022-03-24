import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";

import reducers from "reducers/reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk, promiseMiddleware)),
);

export default store;
