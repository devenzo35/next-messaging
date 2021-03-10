import { applyMiddleware, createStore } from "redux";
import { createWrapper, MakeStore } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./reducers/rootReducer";
import { Context } from "vm";
import  rootSaga  from "../sagas/rootSagas";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore: MakeStore<Object> = (context: Context) => {
  const sagaMiddleware = createSagaMiddleware();
  const initialState = {};
  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  );
  
  (store as any).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};
export const wrapper = createWrapper<Object>(makeStore, { debug: true });
