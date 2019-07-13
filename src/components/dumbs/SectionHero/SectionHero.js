// @flow
import React, { PureComponent } from "react";
import { isEmpty } from "ramda";
import PopupVideo from "../PopupVideo/PopupVideo";
import Animations from "../Animations/Animations";
import withEndReached from "../../hocs/withEndReached/withEndReached";
import { waveCanvas } from "../../../utils/functions";
import styles from "./styles.module.scss";
import TextBox1 from "../TextBox1/TextBox1";

type Props = {
  item: Object
};
type State = {
  isShowPopup: boolean,
  videoSrc: string
};

type Data = any;
type Settings = any;

class SectionHero extends PureComponent<Props, State> {
  static defaultProps = {
    item: {}
  };

  state = {
    isShowPopup: false,
    videoSrc: ""
  };

  videoPopup = React.createRef();

  canvas: Function = React.createRef();

  // ────────────────────────────────────────────────────────────────────────────────
  componentDidMount(): void {
    const { item }: Props = this.props;
    if (!!item.settings.isShowCanvas) {
      waveCanvas({
        el: this.canvas,
        height: 700
      });
    }
  }

  // ────────────────────────────────────────────────────────────────────────────────
  _renderCanvas = (): React$Node => {
    return (
      <div className={styles.canvas}>
        <canvas
          ref={(ref: any): any => {
            this.canvas = ref;
            return this.canvas;
          }}
        />
      </div>
    );
  };

  // ────────────────────────────────────────────────────────────────────────────────
  _renderPopupVideo = (src: string): React$Node => {
    return (
      <div
        ref={this.videoPopup}
        className={styles.popupVideoIframeWrap}
        onClick={this._handleHidePopup}
        role="button"
        tabIndex={0}
      >
        <div className={styles.popupVideoIframe}>
          <iframe
            title="video-title"
            src={src}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  };

  // ────────────────────────────────────────────────────────────────────────────────
  _handleClickVideo = (isShowPopup: boolean, videoSrc: string): void => {
    this.setState(
      {
        isShowPopup,
        videoSrc
      },
      (): void => {
        document.addEventListener("click", this._handleHidePopup);
      }
    );
  };

  // ────────────────────────────────────────────────────────────────────────────────
  _handleHidePopup = (): void => {
    this.setState(
      {
        isShowPopup: false
      },
      (): void => {
        document.removeEventListener("click", this._handleHidePopup);
      }
    );
  };

  // ────────────────────────────────────────────────────────────────────────────────
  _renderLeftSection = (): React$Node => {
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

  // ────────────────────────────────────────────────────────────────────────────────
  _renderRightSection = (): React$Node => {
    const { item }: Props = this.props;
    const { video }: Data = item.data;
    return (
      <div className={styles.videoWrap}>
        <img src="assets/img/macbook.png" alt="" />
        <div className={styles.video}>
          <PopupVideo
            image={video.bgVideo}
            linkVideo={video.linkVideo}
            onClickVideo={this._handleClickVideo}
          />
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

  // ────────────────────────────────────────────────────────────────────────────────
  render(): React$Node {
    const { item }: Props = this.props;
    const { isShowPopup, videoSrc }: State = this.state;
    if (!item.data) {
      return null;
    }
    const { textType, animations, isShowCanvas }: Settings = item.settings;

    return (
      <div>
        {!!isShowPopup && this._renderPopupVideo(videoSrc)}
        <div
          className={`wil-section wil-section--noHidden ${item.section}`}
          style={this._getStylesSection()}
        >
          {!!isShowCanvas && this._renderCanvas()}
          {animations && <Animations data={animations} />}

          <div className={`${styles.sectionHero} wil-container`}>
            <div className="SectionHeroWeb__module">
              <div className={`${styles.rowSection} wil-row items-center`}>
                <div
                  className={`wil-col-xs-12 wil-col-sm-12 wil-col-md-6 ${
                    styles.beforeSection
                  }`}
                  style={
                    textType &&
                    (textType === "text-left" ? { order: 1 } : { order: 2 })
                  }
                >
                  {this._renderLeftSection()}
                </div>

                <div
                  className={`wil-col-xs-12 wil-col-sm-12 wil-col-md-6 ${
                    styles.afterSection
                  }`}
                  style={
                    textType &&
                    (textType === "text-left" ? { order: 2 } : { order: 1 })
                  }
                >
                  {this._renderRightSection()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withEndReached(SectionHero);
