// @flow
import React, { lazy } from "react";

const sectionHeroPromise: any = import(
  /* webpackChunkName: "SectionHero" */ "../../dumbs/SectionHero/SectionHero"
);

const SectionHero: any = lazy((): any => sectionHeroPromise);

function SectionHeroLazy(props: any): React$Node {
  return <SectionHero {...props} />;
}

export default SectionHeroLazy;
