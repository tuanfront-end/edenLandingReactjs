// @flow
import React, { Component } from "react";
import { isEmpty } from "ramda";
import TextBox1 from "../TextBox1/TextBox1";
import withEndReached from "../../hocs/withEndReached/withEndReached";
import Animations from "../Animations/Animations";
import ThreeTextBox from "../ThreeTextBox/ThreeTextBox";
import TwoPhones from "../TwoPhones/TwoPhones";
import Image from "../Image/Image";
import styles from "./styles.module.scss";

type Props = {
  item: Object,
  isForSlide: boolean
};

type Data = {
  section: string,
  icon: string,
  title: string,
  content: string,
  image: Object,
  button: Object,
  groupButtonForDownloadApp: Object,
  textBox: Object,
  phones: Object,
  groupImages: Array<string>
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

class SectionDefault extends Component<Props> {
  static defaultProps = {
    isForSlide: false,
    item: {
      data: {},
      settings: {}
    }
  };

  _renderContent = (): React$Node => {
    const { item }: Props = this.props;
    const {
      title,
      content,
      icon,
      button,
      groupButtonForDownloadApp
    }: Data = item.data;
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
          groupButtonForDownloadApp={groupButtonForDownloadApp}
        />
      </div>
    );
  };

  _renderImage = (): React$Node => {
    const { item }: Props = this.props;
    const { image }: Data = item.data;
    return (
      <div className={styles.image}>
        {!isEmpty(image.href) ? (
          <a href={image.href} target="_blank" rel="noopener noreferrer">
            <Image src={image.src} useDefaultImage={true} alt="alt-img" />
          </a>
        ) : (
          <img src={image.src} alt="alt-img" />
        )}
      </div>
    );
  };

  _renderThreeTextBox = (): React$Node => {
    const { item }: Props = this.props;
    const { textBox }: Data = item.data;
    return <ThreeTextBox data={textBox.textBoxs} type={textBox.type} />;
  };

  _renderTwoPhones = (): React$Node => {
    const { item }: Props = this.props;
    const { phones }: Data = item.data;
    return <TwoPhones data={phones} />;
  };

  _renderGroupImages = (): React$Node => {
    const { item }: Props = this.props;
    const { groupImages }: Data = item.data;
    return (
      <div className={styles.groupImages}>
        {groupImages.map(this._renderGroupImagesItem)}
      </div>
    );
  };

  _renderGroupImagesItem = (item: string, index: number): React$Node => {
    return (
      <div key={String(index)} className={`imageItem imageItem__${index + 1}`}>
        <Image useDefaultImage={true} src={item} alt="alt" />
      </div>
    );
  };

  // ────────────────────────────────────────────────────────────────────────────────
  _getStylesSection = (): Object => {
    const { item, isForSlide }: Props = this.props;
    const { backgroundColor, backgroundImage }: Settings = item.settings;
    return {
      backgroundColor:
        item.settings && !isEmpty(backgroundColor) ? backgroundColor : null,
      backgroundImage:
        item.settings && !isEmpty(backgroundImage) ? backgroundImage : null,
      padding: !!isForSlide ? "5px 0" : null
    };
  };

  render(): React$Node {
    const { item }: Props = this.props;
    if (!item.data) {
      return null;
    }
    const { image, textBox, phones, groupImages }: Data = item.data;
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
              className={`wil-col-xs-12 wil-col-sm-12 wil-col-md-7 wil-col-lg-7 ${
                styles.beforeSection
              }`}
              style={
                textType &&
                (textType === "text-left" ? { order: 2 } : { order: 1 })
              }
            >
              {image && !isEmpty(image) && this._renderImage()}
              {textBox && !isEmpty(textBox) && this._renderThreeTextBox()}
              {phones && !isEmpty(phones) && this._renderTwoPhones()}
              {groupImages &&
                !isEmpty(groupImages) &&
                this._renderGroupImages()}
            </div>

            <div
              className={`wil-col-xs-12 wil-col-sm-12 wil-col-md-5 wil-col-lg-5 ${
                textType === "text-left"
                  ? styles.sectionContentLeft
                  : styles.sectionContentRight
              }  ${styles.afterSection}`}
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

export default withEndReached(SectionDefault);
