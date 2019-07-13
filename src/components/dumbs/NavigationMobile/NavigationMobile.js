// @flow
import React, { Component } from "react";
import { isEmpty } from "ramda";
import { NavLink } from "../NavLink/NavLink";
import styles from "./styles.module.scss";

type Props = {
  data: Object,
  isShow: boolean
};

export default class NavigationMobile extends Component<Props> {
  static defaultProps = {
    data: {},
    isShow: false
  };

  _renderItemIsLink = (item: Object): React$Node => {
    return (
      <NavLink to={item.link}>
        <i className="fas fa-caret-right" />
        {item.name}
      </NavLink>
    );
  };

  _renderItemIsHref = (item: Object): React$Node => {
    return (
      <a target="_blank" rel="noopener noreferrer" href={item.href}>
        <i className="fas fa-caret-right" />
        {item.name}
      </a>
    );
  };

  _renderNavigationItem = (item: Object, index: number): React$Node => {
    return (
      <li className={styles.navigationMobile_item} key={String(index)}>
        {item.link && this._renderItemIsLink(item)}
        {item.href && this._renderItemIsHref(item)}
      </li>
    );
  };

  render(): React$Node {
    const { data, isShow }: Props = this.props;
    if (!data || isEmpty(data)) {
      return null;
    }
    return (
      <div
        className={styles.navigationMobile}
        style={{
          transform: `${!isShow ? "translateX(-100%)" : "translateX(0)"}`
        }}
      >
        <ul className={styles.navigationMobile_menu}>
          {data.map(this._renderNavigationItem)}
        </ul>
      </div>
    );
  }
}
