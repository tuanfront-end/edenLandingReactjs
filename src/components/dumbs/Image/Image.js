// @flow
import React, { PureComponent } from "react";
import createImage from "./createImage";
import { offset } from "../../../utils/functions";

type Props = {
  alt: string,
  src: string,
  preview: string,
  ratio: string,
  containerClassName: string,
  useDefaultImage: boolean,
  parallaxSpeed: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
};

type State = {
  isLoaded: boolean,
  isRemoveTransition: boolean,
  position: number
};

const MIN_PARALLAX_SPEED: number = 0;
const MAX_PARALLAX_SPEED: number = 10;

export default class Image extends PureComponent<Props, State> {
  static defaultProps = {
    alt: "",
    ratio: "default",
    preview:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA9JREFUeNpifvfuHUCAAQAFpALOO255kgAAAABJRU5ErkJggg==",
    containerClassName: "",
    useDefaultImage: true,
    parallaxSpeed: 0
  };

  state = {
    isLoaded: false,
    isRemoveTransition: false,
    position: 0
  };

  _windowScrollTimeout = null;

  _removeTransitionTimeout = null;

  _timeout = null;

  $containerImage: ?HTMLElement;

  componentDidMount(): void {
    const { src, parallaxSpeed }: Props = this.props;
    createImage(src)
      .then(this._handleImageLoad)
      .catch(this._handleImageError);
    if (!!parallaxSpeed) {
      this._handleWindowScroll();
      window.addEventListener("scroll", this._handleWindowScroll);
    }
  }

  componentWillUnmount(): void {
    const { parallaxSpeed }: Props = this.props;
    this._removeTransitionTimeout &&
      clearTimeout(this._removeTransitionTimeout);
    this._timeout && clearTimeout(this._timeout);
    this._windowScrollTimeout && clearTimeout(this._windowScrollTimeout);
    if (!!parallaxSpeed) {
      window.removeEventListener("scroll", this._handleWindowScroll);
    }
  }

  _getWindowScrollTop = (): number => {
    return (
      (window.pageYOffset ||
        (document.documentElement ? document.documentElement.scrollTop : 0)) -
      (document.documentElement ? document.documentElement.clientTop : 0)
    );
  };

  /**
   * Hàm kiểm tra nếu ảnh nằm trong màn hình thì trả về true
   */
  _checkConditionImageInScreen = (): boolean => {
    const { top: containerImageOffsetTop }: { top: number } = offset(
      this.$containerImage
    );
    const containerImageHeight: number = this.$containerImage
      ? this.$containerImage.clientHeight
      : 0;
    const st: number = this._getWindowScrollTop();
    const windowHeight: number = window.innerHeight;
    return (
      st + windowHeight >= containerImageOffsetTop &&
      st <= containerImageOffsetTop + containerImageHeight
    );
  };

  /**
   * Kiểm tra parallaxSpeed trong khoảng 1 đến 10 thì trả về true
   */
  _checkSpeedCondition = (parallaxSpeed: number): boolean => {
    return (
      parallaxSpeed <= MAX_PARALLAX_SPEED && parallaxSpeed >= MIN_PARALLAX_SPEED
    );
  };

  _getParallaxPosition = (): number => {
    const { parallaxSpeed }: Props = this.props;
    const st: number = this._getWindowScrollTop();
    const { top: containerImageOffsetTop }: { top: number } = offset(
      this.$containerImage
    );
    const windowHeight: number = window.innerHeight;
    // Kiểm tra chỉ cho set parallaxSpeed trong khoảng 1 đến 10
    const speedCondition: boolean = this._checkSpeedCondition(parallaxSpeed);
    return speedCondition
      ? -(
          (st + windowHeight - containerImageOffsetTop) /
          (MAX_PARALLAX_SPEED + 2 - parallaxSpeed)
        )
      : 0;
  };

  _handleWindowScroll = (): void => {
    this._windowScrollTimeout = setTimeout((): void => {
      const position: number = this._getParallaxPosition();

      // Kiểm tra xem ảnh nằm trong màn hình thì mới set position
      if (this._checkConditionImageInScreen()) {
        this.setState({ position });
      }
    }, 0);
  };

  _handleImageLoad = async (): Promise<void> => {
    this._timeout = setTimeout((): void => {
      this.setState({
        isLoaded: true
      });
    }, 0);
    this._removeTransitionTimeout = setTimeout((): void => {
      this.setState({
        isRemoveTransition: true
      });
    }, 450);
  };

  _handleImageError = async (): Promise<void> => {
    this._timeout && clearTimeout(this._timeout);
    this._removeTransitionTimeout &&
      clearTimeout(this._removeTransitionTimeout);
    this._windowScrollTimeout && clearTimeout(this._windowScrollTimeout);
    this.setState({
      isLoaded: false
    });
  };

  _getImageAnimated = (type: string = "url"): Object => {
    const { isLoaded, isRemoveTransition }: State = this.state;
    const condition: boolean =
      type === "url" ? isRemoveTransition : !isRemoveTransition;
    const opacityCondition: boolean = type === "url" ? isLoaded : !isLoaded;
    return !condition
      ? {
          opacity: `${opacityCondition ? 1 : 0}`,
          willChange: "opacity",
          transition: "opacity 400ms linear"
        }
      : {};
  };

  _getImageParallaxStyle = (): Object => {
    const { parallaxSpeed }: Props = this.props;
    const { position }: State = this.state;
    return !!parallaxSpeed
      ? {
          backgroundAttachment: "fixed",
          backgroundPosition: `0 ${position}px`
        }
      : {};
  };

  _setImageRef = (c: any): void => {
    this.$containerImage = c;
  };

  render(): React$Node {
    const {
      alt,
      src,
      preview,
      ratio,
      containerClassName,
      useDefaultImage
    }: Props = this.props;
    return (
      <div
        ref={this._setImageRef}
        className={`wil-image relative cover bg-center overflow-hidden ${containerClassName}`}
      >
        {!!preview && (
          <div
            className="absolute top-0 right-0 bottom-0 left-0"
            style={{
              zIndex: -1,
              backgroundImage: `url("${preview}")`,
              ...this._getImageAnimated("preview")
            }}
          />
        )}
        {useDefaultImage ? (
          <img src={src} alt={alt} style={this._getImageAnimated()} />
        ) : (
          <div
            className={`cover bg-center aspect-ratio--${ratio}`}
            style={{
              backgroundImage: `url("${src}")`,
              willChange: "background-position",
              ...this._getImageParallaxStyle(),
              ...this._getImageAnimated(),
              ...(ratio === "default"
                ? {
                    width: "100%",
                    height: "100%"
                  }
                : {})
            }}
            title={alt}
          />
        )}
      </div>
    );
  }
}
