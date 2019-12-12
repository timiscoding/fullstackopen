import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers";
import apiMiddleware from "./apiMiddleware";
import notifyMiddleware from "./notifyMiddleware";
import postApiMiddleware from "./postApiMiddleware";
import preApiMiddleware from "./preApiMiddleware";

const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(
        preApiMiddleware,
        apiMiddleware,
        postApiMiddleware,
        notifyMiddleware,
        thunk
      )
    )
  );
  return store;
};

export default configureStore;
