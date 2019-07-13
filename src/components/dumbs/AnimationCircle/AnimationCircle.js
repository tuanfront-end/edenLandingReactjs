// @flow
import React, { PureComponent } from "react";
import styles from "./styles.module.scss";

type Props = {
  position: "left" | "right"
};

export default class AnimationCircle extends PureComponent<Props> {
  static defaultProps = {
    position: "right"
  };

  render(): React$Node {
    const { position }: Props = this.props;

    return <div className={`${styles.circle} animationCircle--${position}`} />;
  }
}
