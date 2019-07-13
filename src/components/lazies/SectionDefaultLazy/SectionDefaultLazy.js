// @flow
import React, { lazy } from "react";

const sectionDefaultPromise: any = import(
  /* webpackChunkName: "SectionDefault" */ "../../dumbs/SectionDefault/SectionDefault"
);

const SectionDefault: any = lazy((): any => sectionDefaultPromise);

function SectionDefaultLazy(props: any): React$Node {
  return <SectionDefault {...props} />;
}

export default SectionDefaultLazy;
