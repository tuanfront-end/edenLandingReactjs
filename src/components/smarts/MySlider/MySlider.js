// @flow
import React, { PureComponent } from "react";
import Slider from "react-slick";
import SectionDefault from "../../dumbs/SectionDefault/SectionDefault";
import Image from "../../dumbs/Image/Image";
import styles from "./styles.module.scss";

type Props = {
  type: "image" | "component",
  data: Array<any>
};

// ────────────────────────────────────────────────────────────────────────────────
function SampleNextArrow(props: Object): React$Node {
  const { onClick }: any = props;
  return (
    <div
      className={`${styles.nextArrow} ${styles.slickArrow}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <i className="fas fa-angle-right" />
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
function SamplePrevArrow(props: Object): React$Node {
  const { onClick }: any = props;
  return (
    <div
      className={`${styles.prevArrow} ${styles.slickArrow}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <i className="fas fa-angle-left" />
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
export default class MySlider extends PureComponent<Props> {
  static defaultProps = {
    type: "image",
    data: []
  };

  slider: any = React.createRef();

  _renderSlideItemImage = (item: string, index: number): React$Node => {
    return (
      <Image key={String(index)} src={item} useDefaultImage={true} alt="alt" />
    );
  };

  _renderSlideItemComponent = (item: Object, index: number): React$Node => {
    return <SectionDefault key={String(index)} isForSlide={true} item={item} />;
  };

  // ────────────────────────────────────────────────────────────────────────────────
  render(): React$Node {
    const settings: Object = {
      nextArrow: <SampleNextArrow onClick={this.slider.slickNext} />,
      prevArrow: <SamplePrevArrow onClick={this.slider.slickPrev} />,
      customPaging: (i: number): React$Node => {
        return <div className={styles.slick__dotItem} />;
      },
      dotsClass: styles.slick__dot
    };
    const { type, data, ...props }: Props = this.props;
    return (
      <div className={styles.mySlider}>
        <Slider
          ref={(c: any): void => {
            this.slider = c;
          }}
          {...props}
          {...settings}
        >
          {type === "image" && data.map(this._renderSlideItemImage)}
          {type === "component" && data.map(this._renderSlideItemComponent)}
        </Slider>
      </div>
    );
  }
}
