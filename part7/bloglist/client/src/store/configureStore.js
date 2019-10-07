import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers";
import apiMiddleware from "./apiMiddleware";
import notifyMiddleware from "./notifyMiddleware";

const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(apiMiddleware, notifyMiddleware, thunk))
  );
  return store;
};

export default configureStore;
