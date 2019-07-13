// @flow
import React, { Component } from "react";
import styles from "./styles.module.scss";

export default class SpinnerLoadding extends Component<{}> {
  render(): React$Node {
    return (
      <div className={styles.ldsRoller}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  }
}
