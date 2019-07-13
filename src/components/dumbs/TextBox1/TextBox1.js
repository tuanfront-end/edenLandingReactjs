// @flow
import React, { Component } from "react";
import { isEmpty } from "ramda";
import HtmlViewer from "../HtmlViewer/HtmlViewer";
import Button from "../Button/Button";
import styles from "./styles.module.scss";

type Props = {
  icon: string,
  title: string,
  divider: string,
  content: string,
  button: Object,
  groupButtonForDownloadApp: Object,
  color: string,
  centerType: boolean
};

export default class TextBox1 extends Component<Props> {
  static defaultProps = {
    icon: "",
    title: "",
    divider: "",
    content: "",
    button: {},
    groupButtonForDownloadApp: {},
    color: "rgba($color: #000, $alpha: .7)",
    centerType: false
  };

  _renderTitle = (): React$Node => {
    const { icon, title, color }: Props = this.props;
    return (
      <div>
        {icon && <img style={{ marginBottom: 20 }} src={icon} alt="icon" />}
        <HtmlViewer
          className={`landingSectionTitle ${
            color === "white" ? "" : "landingSectionTitle--black"
          }`}
        >
          {title}
        </HtmlViewer>
      </div>
    );
  };

  _renderDivider = (): React$Node => {
    const { divider }: Props = this.props;
    return (
      <div
        className={`divider ${divider === "white" ? "" : "divider-color"}`}
      />
    );
  };

  _renderContent = (): React$Node => {
    const { content, color }: Props = this.props;
    return (
      <HtmlViewer
        className={`landingSectionText ${
          color === "white" ? "" : "landingSectionText--black"
        }`}
      >
        {content}
      </HtmlViewer>
    );
  };

  _renderButton = (): React$Node => {
    const { button }: Props = this.props;
    if (!button) {
      return null;
    }
    return (
      <div style={{ margin: "30px 0" }}>
        <Button
          btnClass={button.btnClass}
          iconAfter={button.iconAfter}
          iconBefore={button.iconBefore}
          link={button.link}
          href={button.href}
        >
          {button.text}
        </Button>
      </div>
    );
  };

  // ────────────────────────────────────────────────────────────────────────────────
  _renderButtonGroup = (): React$Node => {
    const { groupButtonForDownloadApp }: Props = this.props;
    return (
      <div className={styles.groupButtonForDownloadApp}>
        <a
          className="ios-video"
          href={groupButtonForDownloadApp.btnIos}
          title="App Store"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginRight: 10 }}
        >
          <img
            style={{ height: 50 }}
            src="assets/img/web_icons/app-store.png"
            alt=""
          />
        </a>
        <a
          className="android-video"
          href={groupButtonForDownloadApp.btnAndroid}
          target="_blank"
          rel="noopener noreferrer"
          title="Google Play"
        >
          <img
            style={{ height: 50 }}
            src="assets/img/web_icons/google-play.png"
            alt=""
          />
        </a>
      </div>
    );
  };

  render(): React$Node {
    const {
      title,
      divider,
      content,
      button,
      groupButtonForDownloadApp,
      centerType
    }: Props = this.props;
    return (
      <div
        className={`${styles.textBox1} ${
          !!centerType ? styles.textBox1Center : ""
        }`}
      >
        {!isEmpty(title) && this._renderTitle()}
        {!isEmpty(divider) && this._renderDivider()}
        {!isEmpty(content) && this._renderContent()}
        {!isEmpty(button) && this._renderButton()}
        {!isEmpty(groupButtonForDownloadApp) && this._renderButtonGroup()}
      </div>
    );
  }
}
