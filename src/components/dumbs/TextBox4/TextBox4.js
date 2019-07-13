// @flow
import React, { PureComponent } from "react";
import styles from "./styles.module.scss";

type Props = {
  data: Object
};

export default class TextBox4 extends PureComponent<Props> {
  static defaultProps = {
    data: {
      image: "assets/img/web_icons/feature-icons/1-feature-icon.svg",
      title: "one click demo install wordpress"
    }
  };

  render(): React$Node {
    const { data }: Props = this.props;

    return (
      <div className={styles.textBox4}>
        <div className={styles.img}>
          <img src={data.image} alt="" />
        </div>
        <h2 className={styles.title}>{data.title}</h2>
      </div>
    );
  }
}
