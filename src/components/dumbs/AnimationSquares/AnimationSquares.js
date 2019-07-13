// @flow
import React, { PureComponent } from "react";
import styles from "./styles.module.scss";

type Props = {
  position: "left" | "right"
};

export default class SquaresAnimation extends PureComponent<Props> {
  static defaultProps = {
    position: "left"
  };

  render(): React$Node {
    const { position }: Props = this.props;
    return (
      <div className={`${styles.squares} animationSquares--${position}`} />
    );
  }
}
