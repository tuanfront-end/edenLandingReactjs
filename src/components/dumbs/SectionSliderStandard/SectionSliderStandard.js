// @flow
import React, { Component } from "react";
import { isEmpty } from "ramda";
import TextBox1 from "../TextBox1/TextBox1";
import withEndReached from "../../hocs/withEndReached/withEndReached";
import Animations from "../Animations/Animations";

import MySlider from "../../smarts/MySlider/MySlider";
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
  slide: Object
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

class SectionSliderStandard extends Component<Props> {
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
      <div className="wil-container">
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
      </div>
    );
  };

  _renderContentSlider = (): React$Node => {
    const { item }: Props = this.props;
    const { slide }: Data = item.data;
    if (!item || !item.data || !slide) {
      return null;
    }
    const settings: Object = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      centerMode: true,
      centerPadding: "60px",
      responsive: [
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 1,
            centerPadding: "10px",
            slidesToScroll: 1
          }
        }
      ]
    };
    const settings2: Object = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false
    };
    return (
      <div
        className={
          slide.width === "container" ? "wil-container" : "wil-containerFluid"
        }
      >
        <div className={styles.slider}>
          {slide.type === "component" ? (
            <MySlider {...settings2} data={slide.arrSlide} type="component" />
          ) : (
            <MySlider {...settings} data={slide.arrSlide} type="image" />
          )}
        </div>
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
        <div className={styles.sliderStandard}>
          {this._renderHeader()}
          {this._renderContentSlider()}
        </div>
      </div>
    );
  }
}

export default withEndReached(SectionSliderStandard);
