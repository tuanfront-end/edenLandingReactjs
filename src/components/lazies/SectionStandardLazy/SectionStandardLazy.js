// @flow
import React, { lazy } from "react";

const sectionStandard: any = import(
  /* webpackChunkName: "SectionStandard" */ "../../dumbs/SectionStandard/SectionStandard"
);

const SectionStandard: any = lazy((): any => sectionStandard);

function SectionStandardLazy(props: any): React$Node {
  return <SectionStandard {...props} />;
}

export default SectionStandardLazy;
