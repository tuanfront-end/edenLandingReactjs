// @flow
import axios from "../../axiosFaker";
import { GET_NAVIGATION_DATA } from "../../constants/actionTypes";

function getNavigationData(): Function {
  return async (dispatch: Function): Promise<void> => {
    try {
      const { data }: Object = await axios.get("navigation");
      dispatch({
        type: GET_NAVIGATION_DATA,
        payload: !data ? {} : data
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export default getNavigationData;
