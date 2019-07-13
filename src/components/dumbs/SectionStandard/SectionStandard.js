// @flow
import React, { Component } from "react";
import { isEmpty } from "ramda";
import TextBox1 from "../TextBox1/TextBox1";
import withEndReached from "../../hocs/withEndReached/withEndReached";
import Animations from "../Animations/Animations";
import SlideOnMobile from "../SlideOnMobile/SlideOnMobile";
import Image from "../Image/Image";
import Button from "../Button/Button";
import styles from "./styles.module.scss";
import HtmlViewer from "../HtmlViewer/HtmlViewer";

type Props = {
  item: Object
};

type Data = {
  section: string,
  icon: string,
  title: string,
  content: string,
  image: Object,
  video: string,
  button: Object,
  buttonFooter: Object,
  contentFooter: string,
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

class SectionStandard extends Component<Props> {
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

  _renderContentImg = (): React$Node => {
    const { item }: Props = this.props;
    const { image }: Data = item.data;
    return (
      <div className={styles.img}>
        {isEmpty(image.href) ? (
          <Image useDefaultImage={true} src={image.src} alt="alt" />
        ) : (
          <a href={image.href}>
            <Image useDefaultImage={true} src={image.src} alt="alt" />
          </a>
        )}
      </div>
    );
  };

  _renderContentVideo = (): React$Node => {
    const { item }: Props = this.props;
    const { video }: Data = item.data;
    return (
      <div>
        <video autoPlay loop muted style={{ width: "100%" }}>
          <source src={video} />
          {/* <source src="assets/img/video_crop_1280x720_FINAL.webm" /> */}
          <track
            src="captions_en.vtt"
            kind="captions"
            srcLang="en"
            label="english_captions"
          />
        </video>
      </div>
    );
  };

  _renderSlideOnPhone = (): React$Node => {
    const { item }: Props = this.props;
    const { slideOnPhones }: Data = item.data;

    return (
      <div className={styles.image}>
        <SlideOnMobile data={slideOnPhones.data} type={slideOnPhones.type} />
      </div>
    );
  };

  _renderFooterButton = (): React$Node => {
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

  _renderContentFooter = (): React$Node => {
    const { item }: Props = this.props;
    const { contentFooter }: Data = item.data;
    const { color }: Settings = item.settings;
    return (
      <div style={{ textAlign: "center" }}>
        {contentFooter && !isEmpty(contentFooter) && (
          <HtmlViewer
            className={`landingSectionText ${
              color === "white" ? "" : "landingSectionText--black"
            }`}
          >
            {contentFooter}
          </HtmlViewer>
        )}
        {this._renderFooterButton()}
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
    const { image, video, slideOnPhones }: Data = item.data;
    const { animations }: Settings = item.settings;

    return (
      <div
        className={`wil-section wil-SectionStandard wil-${item.section}`}
        style={this._getStylesSection()}
      >
        {animations && <Animations data={animations} />}
        <div className="wil-container">
          <div className={styles.standard}>
            {this._renderHeader()}
            {image && !isEmpty(image) && this._renderContentImg()}
            {video && !isEmpty(video) && this._renderContentVideo()}
            {slideOnPhones &&
              !isEmpty(slideOnPhones) &&
              this._renderSlideOnPhone()}
            {this._renderContentFooter()}
          </div>
        </div>
      </div>
    );
  }
}

export default withEndReached(SectionStandard);
