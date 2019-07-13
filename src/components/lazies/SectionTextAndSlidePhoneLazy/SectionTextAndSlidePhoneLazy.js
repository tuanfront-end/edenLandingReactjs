// @flow
import React, { lazy } from "react";

const sectionTextAndSlidePhone: any = import(
  /* webpackChunkName: "SectionTextAndSlidePhone" */ "../../dumbs/SectionTextAndSlidePhone/SectionTextAndSlidePhone"
);

const SectionTextAndSlidePhone: any = lazy((): any => sectionTextAndSlidePhone);

function SectionTextAndSlidePhoneLazy(props: any): React$Node {
  return <SectionTextAndSlidePhone {...props} />;
}

export default SectionTextAndSlidePhoneLazy;
