import { combineReducers } from "redux";
import homePage from "./reducerHomePageSections/reducerHomePageSections";
import appPage from "./reducerAppPageSections/reducerAppPageSections";
import navigations from "./reducerNavigations/reducerNavigations";

const reducers = combineReducers({
  homePage,
  appPage,
  navigations
});

export default reducers;
