// @flow
import React, { Component } from "react";

type NotFoundProps = {};

export default class NotFoundPage extends Component<NotFoundProps> {
  render(): React$Node {
    return (
      <div className="wil-container">
        <h1>NotFound</h1>
      </div>
    );
  }
}
