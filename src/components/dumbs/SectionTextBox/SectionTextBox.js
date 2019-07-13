// @flow
import React, { Component } from "react";
import { isEmpty } from "ramda";
import TextBox1 from "../TextBox1/TextBox1";
import withEndReached from "../../hocs/withEndReached/withEndReached";
import Animations from "../Animations/Animations";

import Button from "../Button/Button";
import TextBox3 from "../TextBox3/TextBox3";
import TextBox4 from "../TextBox4/TextBox4";
import Quote from "../Quote/Quote";
import styles from "./styles.module.scss";

type Props = {
  item: Object
};

type Data = {
  section: string,
  icon: string,
  title: string,
  content: string,
  image: Object,
  button: Object,
  buttonFooter: Object,
  textBox: Object
};

type Settings = {
  animations: Array<Object>,
  divider: string,
  color: string,
  backgroundColor: string,
  backgroundImage: string,
  textType: string,
  nextSection: string
};

class SectionTextBox extends Component<Props> {
  static defaultProps = {
    item: {
      data: {},
      settings: {}
    }
  };

  _renderHeader = (): React$Node => {
    const { item }: Props = this.props;
    const { title, content, icon, button }: Data = item.data;
    const { divider, color }: Settings = item.settings;
    return (
      <div className={styles.header}>
        <TextBox1
          icon={icon}
          color={color}
          content={content}
          title={title}
          divider={divider}
          button={button}
          centerType={true}
        />
      </div>
    );
  };

  _renderTextBoxContent = (): React$Node => {
    const { item }: Props = this.props;
    if (!item || !item.data) {
      return null;
    }
    const { textBox }: Data = item.data;

    const textBoxColClass: string = `wil-col-xs-${
      item.settings.textBoxCol[0]
    } wil-col-sm-${item.settings.textBoxCol[1]} wil-col-md-${
      item.settings.textBoxCol[2]
    } wil-col-lg-${item.settings.textBoxCol[3]}`;
    return (
      <div className="wil-row">
        {textBox.type === "textBox4" &&
          !isEmpty(textBox.textBoxs) &&
          textBox.textBoxs.map(this._renderTextBox4Item(textBoxColClass))}

        {textBox.type === "textBox3" &&
          !isEmpty(textBox.textBoxs) &&
          textBox.textBoxs.map(this._renderTextBox3Item(textBoxColClass))}

        {textBox.type === "quote" &&
          !isEmpty(textBox.textBoxs) &&
          textBox.textBoxs.map(this._renderQuoteItem(textBoxColClass))}
      </div>
    );
  };

  _renderButton = (): React$Node => {
    const { item }: Props = this.props;
    const { buttonFooter }: Data = item.data;
    if (!buttonFooter || isEmpty(buttonFooter)) {
      return null;
    }
    return (
      <div className={styles.button}>
        {buttonFooter && (
          <Button
            btnClass={buttonFooter.btnClass}
            iconAfter={buttonFooter.iconAfter}
            iconBefore={buttonFooter.iconBefore}
            link={buttonFooter.link}
            href={buttonFooter.href}
          >
            {buttonFooter.text}
          </Button>
        )}
      </div>
    );
  };

  // ────────────────────────────────────────────────────────────────────────────────
  _renderTextBox4Item = (textBoxColClass: string): Function => (
    item: Object,
    index: number
  ): any => {
    return (
      <div className={textBoxColClass} key={String(index)}>
        <TextBox4 data={item} />
      </div>
    );
  };

  // ────────────────────────────────────────────────────────────────────────────────
  _renderTextBox3Item = (textBoxColClass: string): Function => (
    item: Object,
    index: number
  ): any => {
    return (
      <div className={textBoxColClass} key={String(index)}>
        <TextBox3 data={item} />
      </div>
    );
  };

  // ────────────────────────────────────────────────────────────────────────────────
  _renderQuoteItem = (textBoxColClass: string): Function => (
    item: Object,
    index: number
  ): React$Node => {
    return (
      <div key={String(index)} className={textBoxColClass}>
        <Quote data={item} />
      </div>
    );
  };

  // ────────────────────────────────────────────────────────────────────────────────
  _getStylesSection = (): Object => {
    const { item }: Props = this.props;
    const { backgroundColor, backgroundImage }: Settings = item.settings;
    return {
      backgroundColor:
        item.settings && !isEmpty(backgroundColor) ? backgroundColor : null,
      backgroundImage:
        item.settings && !isEmpty(backgroundImage) ? backgroundImage : null
    };
  };

  render(): React$Node {
    const { item }: Props = this.props;
    if (!item.data) {
      return null;
    }
    const { animations }: Settings = item.settings;

    return (
      <div
        className={`wil-section wil-SectionTextBox wil-${item.section}`}
        style={this._getStylesSection()}
      >
        {animations && <Animations data={animations} />}
        <div className="wil-container">
          <div className="wil-row items-center">
            {this._renderHeader()}
            {this._renderTextBoxContent()}
            {this._renderButton()}
          </div>
        </div>
      </div>
    );
  }
}

export default withEndReached(SectionTextBox);
