// @flow
import {
  GET_NEW_HOME_SECTION,
  GET_HOME_SECTION_INDEX
} from "../../constants/actionTypes";

function getNewHomeSection(
  state: Object = {},
  { type, payload }: Object
): Object {
  switch (type) {
    case GET_NEW_HOME_SECTION:
      return { ...state, homeSections: [...state.homeSections, payload] };

    case GET_HOME_SECTION_INDEX:
      return {
        ...state,
        homeSections: payload.homeSections,
        homeSectionIndex: payload.homeSectionIndex
      };

    default:
      return state;
  }
}
export default getNewHomeSection;
