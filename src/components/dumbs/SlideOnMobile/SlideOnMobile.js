// @flow
import React, { Component } from "react";
import MySlider from "../../smarts/MySlider/MySlider";
import Image from "../Image/Image";
import styles from "./styles.module.scss";

type Props = {
  data: Array<string>,
  type: "overHidden" | "overShow"
};

export default class SlideOnMobile extends Component<Props> {
  static defaultProps = {
    data: [],
    type: "overHidden"
  };

  render(): React$Node {
    const { data, type }: Props = this.props;
    const settings: Object = {
      dots: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 4000,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 3,
      arrows: false
    };
    return (
      <div>
        <div className={styles.slideMobile}>
          <div className="relative">
            <div className={styles.imgCover}>
              <Image
                useDefaultImage={true}
                src="assets/img/phones/0.png"
                alt=""
              />
            </div>
            <div
              className={
                type === "overShow" ? styles.sliderOverShow : styles.slider
              }
            >
              <MySlider {...settings} data={data} type="image" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
