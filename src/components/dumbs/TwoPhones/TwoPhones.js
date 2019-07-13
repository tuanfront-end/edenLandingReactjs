// @flow
import React, { Component } from "react";
import HtmlViewer from "../HtmlViewer/HtmlViewer";
import styles from "./styles.module.scss";

type Props = {
  data: Object
};

export default class TwoPhones extends Component<Props> {
  static defaultProps = {
    data: {}
  };

  render(): React$Node {
    const { data }: Props = this.props;
    return (
      <div className={styles.twoPhones}>
        <div className={`${styles.phone} ${styles.phone1}`}>
          <HtmlViewer>{data.phone1}</HtmlViewer>

          <div className={styles.imgCover} style={{ zIndex: "-1" }}>
            <img src="assets/img/iphone6s_white.png" alt="alt" />
          </div>
        </div>
        <div className={`${styles.phone} ${styles.phone2}`}>
          <HtmlViewer>{data.phone2}</HtmlViewer>
          <div className={styles.imgCover} style={{ zIndex: "-1" }}>
            <img src="./assets/img/nexus5_black.png" alt="alt" />
          </div>
        </div>
      </div>
    );
  }
}
