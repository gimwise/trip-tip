import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";

import { rootReducers } from "./index";

// 크롬 데브 툴스 설정입니다.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware();

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(epicMiddleware))
);

export default store;