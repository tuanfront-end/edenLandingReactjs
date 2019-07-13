// @flow
import React, { lazy } from "react";

const sectionTextBox: any = import(
  /* webpackChunkName: "SectionTextBox" */ "../../dumbs/SectionTextBox/SectionTextBox"
);

const SectionTextBox: any = lazy((): any => sectionTextBox);

function SectionTextBoxLazy(props: any): React$Node {
  return <SectionTextBox {...props} />;
}

export default SectionTextBoxLazy;
