// @flow
import {
  GET_NEW_APP_SECTION,
  GET_APP_SECTION_INDEX
} from "../../constants/actionTypes";

function getNewAppSection(
  state: Object = {},
  { type, payload }: Object
): Object {
  switch (type) {
    case GET_NEW_APP_SECTION:
      return { ...state, appSections: [...state.appSections, payload] };

    case GET_APP_SECTION_INDEX:
      return {
        ...state,
        appSections: payload.appSections,
        appSectionIndex: payload.appSectionIndex
      };

    default:
      return state;
  }
}
export default getNewAppSection;
