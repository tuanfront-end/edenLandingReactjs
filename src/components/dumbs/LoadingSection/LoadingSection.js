// @flow
import React, { PureComponent } from "react";

export default class LoadingSection extends PureComponent<{}> {
  render(): React$Node {
    return (
      <div className="flex flex-row-ns flex-column mb5-ns mb4">
        <div className="w-50-ns w-100 mb0-ns mb4 mh3-ns">
          <div className="bg-black-10 aspect-ratio--16x9" />
        </div>
        <div className="w-50-ns w-100 flex flex-column mh3-ns justify-between">
          <div className="bg-black-10 h3 w-90 mb4" />
          <div className="bg-black-10 h2 w-100 mb4" />
          <div className="bg-black-10 h2 w-70 mb4" />
          <div className="bg-black-10 h2 w-50 mb4" />
          <div className="bg-black-10 h2 w-30 mb4" />
        </div>
      </div>
    );
  }
}
