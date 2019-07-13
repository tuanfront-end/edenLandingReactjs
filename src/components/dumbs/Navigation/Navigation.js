// @flow
import React, { Component } from "react";
import { isEmpty } from "ramda";
import { Link } from "@reach/router";
import { NavLink } from "../NavLink/NavLink";
import Button from "../Button/Button";
import Image from "../Image/Image";
import NavigationTabForMobile from "../NavigationTabForMobile/NavigationTabForMobile";
import NavigationForLaptop from "../NavigationForLaptop/NavigationForLaptop";
import styles from "./styles.module.scss";

type Props = {
  getNavigationDataAction: Function,
  navigations: Object
};

type State = {
  isTop: boolean
};

export default class Navigation extends Component<Props, State> {
  state = {
    isTop: true
  };

  // ────────────────────────────────────────────────────────────────────────────────
  async componentDidMount(): Promise<void> {
    const { getNavigationDataAction }: Props = this.props;
    await getNavigationDataAction();
    window.addEventListener("scroll", this._handleScroll);
  }

  // ────────────────────────────────────────────────────────────────────────────────
  componentWillUnmount(): void {
    window.removeEventListener("scroll", this._handleScroll);
  }

  // ────────────────────────────────────────────────────────────────────────────────
  _handleScroll = (): void => {
    this.setState({
      isTop: window.pageYOffset === 0 || window.scrollY === 0
    });
  };

  // ────────────────────────────────────────────────────────────────────────────────
  _getStylesSection = (): Object => {
    const { navigations }: Props = this.props;
    return {
      backgroundColor:
        navigations.settings && !isEmpty(navigations.settings.backgroundColor)
          ? navigations.settings.backgroundColor
          : null,
      backgroundImage:
        navigations.settings && !isEmpty(navigations.settings.backgroundImage)
          ? navigations.settings.backgroundImage
          : null
    };
  };

  // ────────────────────────────────────────────────────────────────────────────────
  _renderButtonGroup = (): React$Node => {
    const { navigations }: Props = this.props;
    return (
      <div className={styles.navigation_btnGroup}>
        {navigations.buttons &&
          !isEmpty(navigations.buttons) &&
          navigations.buttons.map(this._renderButtonItem)}
      </div>
    );
  };

  // ────────────────────────────────────────────────────────────────────────────────
  _renderButtonItem = (item: Object, index: number): React$Node => {
    return (
      <div className={styles.navigation_btnItem} key={String(index)}>
        <Button
          btnClass={item.type}
          iconBefore={item.iconBefore}
          href={item.href}
        >
          {item.name}
        </Button>
      </div>
    );
  };

  // ────────────────────────────────────────────────────────────────────────────────
  _renderNavigationMenu = (): React$Node => {
    const { navigations }: Props = this.props;
    return (
      <ul className={styles.navigation_menu}>
        {navigations.navs &&
          !isEmpty(navigations.navs) &&
          navigations.navs.map(this._renderNavigationMenuItem)}
      </ul>
    );
  };

  // ────────────────────────────────────────────────────────────────────────────────
  _renderNavigationMenuItem = (item: Object, index: number): React$Node => {
    return (
      <li className={styles.navigation_item} key={String(index)}>
        {item.link && <NavLink to={item.link}>{item.name}</NavLink>}
        {item.href && (
          <a target="_blank" rel="noopener noreferrer" href={item.href}>
            {item.name}
          </a>
        )}
      </li>
    );
  };

  // ────────────────────────────────────────────────────────────────────────────────
  _renderLogo = (): React$Node => {
    const { navigations }: Props = this.props;
    return (
      <div className={styles.logo}>
        {navigations.logo && (
          <Link to="./">
            <Image
              useDefaultImage={true}
              src={navigations.logo.headerLogo}
              alt="alt"
            />
          </Link>
        )}
      </div>
    );
  };

  // ────────────────────────────────────────────────────────────────────────────────
  render(): React$Node {
    const { navigations }: Props = this.props;
    const { isTop }: State = this.state;
    if (!navigations) {
      return null;
    }
    return (
      <div className={styles.headerWrap}>
        <div
          className={`${styles.header} ${!!isTop ? styles.wilHeaderTop : ""} `}
          style={this._getStylesSection()}
        >
          {this._renderLogo()}

          <div className={styles.navigation}>
            <nav className={styles.navigation_nav}>
              <div>
                {this._renderNavigationMenu()}
                <div className={styles.navForLaptop}>
                  <NavigationForLaptop data={navigations.navs} />
                </div>
              </div>
              {this._renderButtonGroup()}
            </nav>
          </div>
        </div>
        <div className={styles.navForMobile}>
          <NavigationTabForMobile data={navigations.navs} />
        </div>
      </div>
    );
  }
}
