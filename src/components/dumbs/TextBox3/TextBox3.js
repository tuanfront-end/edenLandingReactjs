// @flow
import React, { PureComponent } from "react";
import styles from "./styles.module.scss";

type Props = {
  data: Object
};

export default class TextBox3 extends PureComponent<Props> {
  static defaultProps = {
    data: {
      image: "assets/img/web_icons/paid-claim-listing.svg",
      title: "",
      content: "Another reim it."
    }
  };

  render(): React$Node {
    const { data }: Props = this.props;
    return (
      <div className={styles.wilTextbox3}>
        <div className={styles.imgWrap}>
          <img className={styles.img} src={data.image} alt="" />
        </div>
        <h3 className={styles.title}>{data.title}</h3>
        <div className="devider--style2" />
        <div className={styles.content}>{data.content}</div>
      </div>
    );
  }
}
