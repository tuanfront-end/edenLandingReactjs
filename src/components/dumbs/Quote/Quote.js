// @flow
import React, { PureComponent } from "react";
import { isEmpty } from "ramda";
import styles from "./styles.module.scss";

type Props = {
  data: Object
};

export default class Quote extends PureComponent<Props> {
  static defaultProps = {
    data: {
      title: "Feature availability",
      content: " Only five stars! a.",
      auth: "SergeyX",
      image: "assets/img/web_icons/envato.svg",
      voteStar: 5
    }
  };

  _renderStarVote = (number: number): Array<any> => {
    if (number < 6) {
      let stars: Array<any> = [];
      for (let i: number = 0; i < number; i += 1) {
        stars = [...stars, <i key={String(i)} className="fa fa-star" />];
      }
      return stars;
    }
    return [];
  };

  _renderIcon = (): React$Node => {
    const { data }: Props = this.props;
    return (
      <div className={styles.quote__icon}>
        <img src={data.image} alt="alt-img" />
      </div>
    );
  };

  _renderHeader = (): React$Node => {
    const { data }: Props = this.props;
    return (
      <div className={styles.quote__header}>
        <div className={styles.quote__stars}>
          {this._renderStarVote(data.voteStar)}
        </div>
        <h3 className={styles.quote__title}>
          {`for `}
          <span>{data.title}</span>
        </h3>
      </div>
    );
  };

  _renderContent = (): React$Node => {
    const { data }: Props = this.props;
    return (
      <div>
        <div className={styles.quote__body}>{data.content}</div>
        <div className={styles.quote__author}>
          {`by `}
          <span>{data.auth}</span>
        </div>
      </div>
    );
  };

  render(): React$Node {
    const { data }: Props = this.props;
    if (!data || isEmpty(data)) {
      return null;
    }
    return (
      <div className={styles.quote__module}>
        {this._renderIcon()}
        <div className={styles.quote__textWrapped}>
          {this._renderHeader()}

          {this._renderContent()}
        </div>
      </div>
    );
  }
}
