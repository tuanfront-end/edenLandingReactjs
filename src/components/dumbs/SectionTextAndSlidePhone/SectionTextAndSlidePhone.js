// @flow
import React, { Component } from "react";
import { isEmpty } from "ramda";
import TextBox1 from "../TextBox1/TextBox1";
import withEndReached from "../../hocs/withEndReached/withEndReached";
import Animations from "../Animations/Animations";
import SlideOnMobile from "../SlideOnMobile/SlideOnMobile";
import styles from "./styles.module.scss";

type Props = {
  item: Object
};

type Data = {
  section: string,
  icon: string,
  title: string,
  content: string,
  button: Object,
  arrSlide: Array<string>,
  slideOnPhones: Object
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

class SectionTextAndSlidePhone extends Component<Props> {
  static defaultProps = {
    item: {
      data: {},
      settings: {}
    }
  };

  _renderContent = (): React$Node => {
    const { item }: Props = this.props;
    const { title, content, icon, button }: Data = item.data;
    const { divider, color }: Settings = item.settings;
    return (
      <div className={styles.content}>
        <TextBox1
          icon={icon}
          color={color}
          content={content}
          title={title}
          divider={divider}
          button={button}
        />
      </div>
    );
  };

  _renderSlider = (): React$Node => {
    const { item }: Props = this.props;
    const { slideOnPhones }: Data = item.data;
    if (!slideOnPhones || isEmpty(slideOnPhones)) {
      return null;
    }
    return (
      <div className={styles.image}>
        <SlideOnMobile data={slideOnPhones.data} type={slideOnPhones.type} />
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
    const { textType, animations }: Settings = item.settings;

    return (
      <div
        className={`wil-section wil-SectionDefault wil-${item.section}`}
        style={this._getStylesSection()}
      >
        {animations && <Animations data={animations} />}
        <div className="wil-container">
          <div className="wil-row items-center">
            <div
              className="wil-col-xs-12 wil-col-sm-12 wil-col-md-6 wil-col-lg-6"
              style={
                textType &&
                (textType === "text-left" ? { order: 2 } : { order: 1 })
              }
            >
              {this._renderSlider()}
            </div>

            <div
              className={`wil-col-xs-12 wil-col-sm-12 wil-col-md-6 wil-col-lg-6 ${
                textType === "text-left"
                  ? styles.sectionContentLeft
                  : styles.sectionContentRight
              }`}
              style={textType === "text-left" ? { order: 1 } : { order: 2 }}
            >
              {this._renderContent()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withEndReached(SectionTextAndSlidePhone);
