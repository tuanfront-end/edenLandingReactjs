// @flow
import React, { lazy } from "react";

const sectionSliderStandard: any = import(
  /* webpackChunkName: "SectionSliderStandard" */ "../../dumbs/SectionSliderStandard/SectionSliderStandard"
);

const SectionSliderStandard: any = lazy((): any => sectionSliderStandard);

function SectionSliderStandardLazy(props: any): React$Node {
  return <SectionSliderStandard {...props} />;
}

export default SectionSliderStandardLazy;
