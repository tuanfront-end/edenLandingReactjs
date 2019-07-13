// @flow
import { GET_NEW_APP_SECTION } from "../../constants/actionTypes";
import axios from "../../axiosFaker";

function getNewAppSectionAction(section: string): Function {
  return async (dispatch: Function): Promise<void> => {
    try {
      const { data }: Object = await axios.get(section);
      dispatch({
        type: GET_NEW_APP_SECTION,
        payload: !data ? {} : data
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export default getNewAppSectionAction;
