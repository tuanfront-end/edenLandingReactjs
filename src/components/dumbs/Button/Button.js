// @flow
import React, { PureComponent } from "react";
import { Link } from "@reach/router";
import { isEmpty } from "ramda";
import "./styles.scss";

type Props = {
  children: any,
  // eslint-disable-next-line flowtype/space-after-type-colon
  btnClass:
    | "wil-btn--gradient"
    | "wil-btn--green"
    | "wil-btn--light"
    | "wil-btn--border",
  iconBefore: string,
  iconAfter: string,
  onClick?: Function,
  href?: string,
  link?: string
};

export default class Button extends PureComponent<Props> {
  static defaultProps = {
    children: "Read more",
    btnClass: "wil-btn--gradient",
    iconBefore: "",
    iconAfter: "",
    href: "",
    link: "/"
  };

  // ────────────────────────────────────────────────────────────────────────────────
  _renderButtontypeHref = (): React$Node => {
    const {
      children,
      btnClass,
      onClick,
      iconBefore,
      iconAfter,
      href
    }: Props = this.props;
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`wil-btn br-pill ${btnClass}`}
        onClick={onClick}
      >
        {!isEmpty(iconBefore) && (
          <i className={`btn-iconBefore ${iconBefore}`} />
        )}
        {children}
        {!isEmpty(iconAfter) && <i className={`btn-iconAfter ${iconAfter}`} />}
      </a>
    );
  };

  // ────────────────────────────────────────────────────────────────────────────────
  _renderButtontypeLink = (): React$Node => {
    const {
      children,
      btnClass,
      onClick,
      iconBefore,
      iconAfter,
      link
    }: Props = this.props;
    return (
      <Link
        to={link}
        className={`wil-btn br-pill ${btnClass}`}
        onClick={onClick}
      >
        {!isEmpty(iconBefore) && (
          <i className={`btn-iconBefore ${iconBefore}`} />
        )}
        {children}
        {!isEmpty(iconAfter) && <i className={`btn-iconAfter ${iconAfter}`} />}
      </Link>
    );
  };

  // ────────────────────────────────────────────────────────────────────────────────
  render(): React$Node {
    const { href }: Props = this.props;
    if (!isEmpty(href)) {
      return this._renderButtontypeHref();
    }
    return <div>{this._renderButtontypeLink()}</div>;
  }
}
