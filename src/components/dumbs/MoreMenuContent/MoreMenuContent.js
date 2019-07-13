// @flow
import React, { Component } from "react";
import styles from "./styles.module.scss";

type Props = {
  data: Object,
  type: string
};

export default class MoreMenuContent extends Component<Props> {
  static defaulProps = {
    data: {},
    type: "bottom"
  };

  _renderMoreMenuItem = (item: Object, index: number): React$Node => {
    return (
      <li key={String(index)}>
        <a
          className={styles.moreMenuItem}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.name}
        </a>
      </li>
    );
  };

  render(): React$Node {
    const { data, type }: Props = this.props;
    return (
      <div
        className={`${styles.moreMenuContent} ${
          type === "top" ? styles.moreMenuContentTop : ""
        }`}
      >
        <ul
          className={`${styles.moreMenuContentMenu} ${
            type === "top" ? styles.top : ""
          }`}
        >
          {data.map(this._renderMoreMenuItem)}
        </ul>
      </div>
    );
  }
}
