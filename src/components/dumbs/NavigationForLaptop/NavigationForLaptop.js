// @flow
import React, { Component } from "react";
import { isEmpty } from "ramda";
import { NavLink } from "../NavLink/NavLink";
import MoreMenuContent from "../MoreMenuContent/MoreMenuContent";
import styles from "./styles.module.scss";

type Props = {
  data: Array<Object>
};
type State = {
  isShowMoreMenuContent: boolean
};

export default class NavigationForLaptop extends Component<Props, State> {
  static defaultProps = {
    data: []
  };

  state = {
    isShowMoreMenuContent: false
  };

  _handleShowMoreMenuContent = (event: any): void => {
    event.preventDefault();
    const { isShowMoreMenuContent }: State = this.state;
    this.setState({
      isShowMoreMenuContent: !isShowMoreMenuContent
    });
  };

  _renderMainMenu = (): React$Node => {
    const { data }: Props = this.props;
    return (
      <ul className={styles.mainMenu}>
        {!isEmpty(data) && data.map(this._renderMainMenuItem)}
      </ul>
    );
  };

  _renderMainMenuItem = (item: Object, index: number): React$Node => {
    if (item.href) {
      return null;
    }
    return (
      <li className={styles.menuItem} key={String(index)}>
        <NavLink to={item.link}>{item.name}</NavLink>
      </li>
    );
  };

  _renderMoreMenu = (): React$Node => {
    const { isShowMoreMenuContent }: State = this.state;
    return (
      <ul className={styles.moreMenu}>
        <li className={styles.menuItem}>
          <a href="/" onClick={this._handleShowMoreMenuContent}>
            <span>More</span>
            <i className="fas fa-chevron-down" />
          </a>
        </li>
        {!!isShowMoreMenuContent && this._renderMoreMenuContent()}
      </ul>
    );
  };

  _renderMoreMenuContent = (): React$Node => {
    const { data }: Props = this.props;
    const hrefMenuData: Array<Object> = data.filter(
      (item: Object): boolean => item.href
    );
    return <MoreMenuContent data={hrefMenuData} type="bottom" />;
  };

  render(): React$Node {
    return (
      <div className={styles.nav}>
        <div className={styles.mainMenuWrap}>{this._renderMainMenu()}</div>
        <div className={styles.moreMenuWrap}>{this._renderMoreMenu()}</div>
      </div>
    );
  }
}
