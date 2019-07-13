// @flow
import { connect } from "react-redux";
import AppPage from "../../pages/AppPage/AppPage";
import {
  getNewAppSectionAction,
  getAppSectionIndexAction
} from "../../../actions";

const mapDispatchToProps: Object = {
  getNewAppSectionAction,
  getAppSectionIndexAction
};
const mapStateToProps: Object = ({ appPage }) => ({ appPage });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppPage);
