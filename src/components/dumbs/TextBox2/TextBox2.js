// @flow
import React, { PureComponent } from "react";
import styles from "./styles.module.scss";

type Props = {
  data: Object
};

type DataType = {
  img: string,
  title: string,
  content: string
};

export default class TextBox2 extends PureComponent<Props> {
  static defaultProps = {
    data: {
      img: "assets/img/web_icons/triangle.svg",
      title: "",
      content: ""
    }
  };

  render(): React$Node {
    const { data }: Props = this.props;
    const { img, title, content }: DataType = data;
    return (
      <div>
        <div className={styles.textBox2}>
          <div className={styles.icon}>
            <img src={img} alt="" />
          </div>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.content}>{content}</div>
        </div>
      </div>
    );
  }
}
