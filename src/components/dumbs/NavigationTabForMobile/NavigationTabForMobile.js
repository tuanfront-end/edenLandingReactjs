// @flow
import React, { Component } from "react";
import { isEmpty } from "ramda";
import { NavLinkMobile } from "../NavLink/NavLink";
import MoreMenuContent from "../MoreMenuContent/MoreMenuContent";
import styles from "./styles.module.scss";

type Props = {
  data: Array<Object>
};
type State = {
  isShowMoreMenuContent: boolean
};

export default class NavigationTabForMobile extends Component<Props, State> {
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

  _renderMainTab = (): React$Node => {
    const { data }: Props = this.props;
    return (
      <ul className={styles.mainTab}>
        {!isEmpty(data) && data.map(this._renderNavItem)}
      </ul>
    );
  };

  _renderMoreMenu = (): React$Node => {
    const { isShowMoreMenuContent }: State = this.state;
    return (
      <ul className={styles.moreMenuWrap}>
        <li className={styles.tab}>
          <a
            href="/"
            className={styles.tabItem}
            onClick={this._handleShowMoreMenuContent}
          >
            <i className="fas fa-caret-square-down" />
            <span>More</span>
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
    return (
      <div>
        <MoreMenuContent type="top" data={hrefMenuData} />
      </div>
    );
  };

  _renderNavItem = (item: Object, index: number): React$Node => {
    switch (item.link) {
      case "/":
        return this._renderNavHome(item, index);
      case "/appPage":
        return this._renderNavApp(item, index);
      default:
        return null;
    }
  };

  _renderNavHome = (item: Object, index: number): React$Node => {
    return (
      <li className={styles.tab} key={String(index)}>
        <NavLinkMobile to={item.link} className={styles.tabItem}>
          <i className="fas fa-home" />
          Home
        </NavLinkMobile>
      </li>
    );
  };

  _renderNavApp = (item: Object, index: number): React$Node => {
    return (
      <li className={styles.tab} key={String(index)}>
        <NavLinkMobile to={item.link} className={styles.tabItem}>
          <i className="fas fa-mobile-alt" />
          App
        </NavLinkMobile>
      </li>
    );
  };

  render(): React$Node {
    return (
      <div className={styles.nav}>
        <div className={styles.navTabMobiles}>
          <div className={styles.navTabMobileMain}>{this._renderMainTab()}</div>
          <div className={styles.navTabMobileMoreMenu}>
            {this._renderMoreMenu()}
          </div>
        </div>
      </div>
    );
  }
}
