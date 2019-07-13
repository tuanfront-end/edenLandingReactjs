// @flow
import { connect } from "react-redux";
import Navigation from "../../dumbs/Navigation/Navigation";
import { getNavigationDataAction } from "../../../actions";

const mapStateToProps: Object = ({ navigations }) => ({ navigations });
const mapDispatchToProps: Object = {
  getNavigationDataAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
