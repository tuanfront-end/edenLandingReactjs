// @flow
import React, { PureComponent } from "react";
import Image from "../Image/Image";
import styles from "./styles.module.scss";

type Props = {
  linkVideo: string,
  image: string,
  onClickVideo: Function
};
type State = {
  isShowPopup: boolean
};

export default class PopupVideo extends PureComponent<Props, State> {
  _handleShowPopup = (): void => {
    const { onClickVideo, linkVideo }: Props = this.props;
    onClickVideo(true, linkVideo);
  };

  // ────────────────────────────────────────────────────────────────────────────────
  render(): React$Node {
    const { image }: Props = this.props;
    return (
      <div className={styles.popupVideoWrap}>
        <Image
          useDefaultImage={false}
          src={image}
          containerClassName={styles.popupVideo}
        />
        <div
          className={styles.playBtnWrap}
          onClick={this._handleShowPopup}
          role="button"
          tabIndex={0}
        >
          <div className={styles.playBtn}>
            <i className="fas fa-play" />
            <div className={styles.animation} />
          </div>
        </div>
      </div>
    );
  }
}
