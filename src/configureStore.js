import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import rootReducers from "./reducers";

const isDev = process.env.NODE_ENV === "development";
const composeEnhancers =
  (isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["reducerAppSections", "reducerHomeSections", "reducerNavigation"]
};

const reducers = persistReducer(persistConfig, rootReducers);
const middlewares = [];
middlewares.push(thunk);
if (isDev) {
  middlewares.push(logger);
}

const store = createStore(
  reducers,
  undefined,
  composeEnhancers(applyMiddleware(...middlewares))
);
const persistor = persistStore(store);

export { store, persistor };
