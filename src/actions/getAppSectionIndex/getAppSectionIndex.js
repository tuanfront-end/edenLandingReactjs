// @flow
import { GET_APP_SECTION_INDEX } from "../../constants/actionTypes";
import { getArrayAsyncFromData } from "../../utils/functions";

function getAppSectionIndex(sections: Array<string>): Function {
  return async (dispatch: Function): Promise<void> => {
    try {
      const arrData: Array<any> = await Promise.all(
        getArrayAsyncFromData(sections)
      );
      const res: Array<{}> = arrData.reduce(
        (arr: Array<{}>, item: Object): Array<{}> => {
          return [...arr, !item.data ? {} : item.data];
        },
        []
      );

      dispatch({
        type: GET_APP_SECTION_INDEX,
        payload: {
          appSections: res,
          appSectionIndex: sections
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export default getAppSectionIndex;
