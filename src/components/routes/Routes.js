// @flow
import React, { PureComponent } from "react";
import MainContent from "./MainContent/MainContent";
import NavigationContainer from "../containers/NavigationContainer/NavigationContainer";

class Routes extends PureComponent<{}> {
  render(): React$Node {
    return (
      <div>
        <NavigationContainer />
        <MainContent />
      </div>
    );
  }
}

export default Routes;
