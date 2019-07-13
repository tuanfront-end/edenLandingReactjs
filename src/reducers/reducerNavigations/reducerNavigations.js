// @flow
import { GET_NAVIGATION_DATA } from "../../constants/actionTypes";

function navigtionReducer(state: Object = {}, { type, payload }: any): Object {
  switch (type) {
    case GET_NAVIGATION_DATA:
      return payload;

    default:
      return state;
  }
}

export default navigtionReducer;
