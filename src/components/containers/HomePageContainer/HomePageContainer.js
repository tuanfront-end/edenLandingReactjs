// @flow
import { connect } from "react-redux";
import HomePage from "../../pages/HomePage/HomePage";
import {
  getNewHomeSectionAction,
  getHomeSectionIndexAction
} from "../../../actions";

const mapStateToProps: Object = ({ homePage }) => ({ homePage });
const mapDispatchToProps: Object = {
  getNewHomeSectionAction,
  getHomeSectionIndexAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
