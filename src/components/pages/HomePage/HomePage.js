// @flow
import React, { Component, Suspense } from "react";
import { isEmpty } from "ramda";
import axios from "../../../axiosFaker";
import SpinnerLoadding from "../../dumbs/SpinnerLoadding/SpinnerLoadding";

import {
  SectionDefaultLazy,
  SectionHeroLazy,
  SectionSliderStandardLazy,
  SectionStandardLazy,
  SectionTextAndSlidePhoneLazy,
  SectionTextBoxLazy
} from "../../lazies";

type Props = {
  getNewHomeSectionAction: Function,
  getHomeSectionIndexAction: Function,
  homePage: Object
};
type State = {
  isLoadding: boolean
};

type Reducer = {
  homeSectionIndex: Array<string>,
  homeSections: Array<Object>
};

export default class HomePage extends Component<Props, State> {
  state = {
    isLoadding: false
  };

  // ────────────────────────────────────────────────────────────────────────────────
  async componentDidMount(): Promise<void> {
    const { data }: Object = await axios.get("home");
    const { getHomeSectionIndexAction }: Props = this.props;
    await getHomeSectionIndexAction(data.data);
  }

  // ────────────────────────────────────────────────────────────────────────────────
  _checkSectionIsExits = (onNextSection: string): any => {
    const { homePage }: Props = this.props;
    const { homeSections }: Reducer = homePage;

    const isExits: Array<Object> = homeSections.filter(
      (item: Object): boolean => item.section === onNextSection
    );
    if (!isEmpty(isExits) || !onNextSection) {
      return null;
    }
    return true;
  };

  // ────────────────────────────────────────────────────────────────────────────────
  _loadmoreSection = async (onNextSection: string): Promise<any> => {
    const checked: any = this._checkSectionIsExits(onNextSection);
    if (!checked) {
      return null;
    }
    this.setState({
      isLoadding: true
    });
    const { getNewHomeSectionAction }: Props = this.props;
    await getNewHomeSectionAction(onNextSection);
    this.setState({
      isLoadding: false
    });
    return null;
  };

  // ────────────────────────────────────────────────────────────────────────────────
  _renderSectionItemSwithCase = (sectionItem: Object): Function => (
    item: Object,
    index: number
  ): Function => {
    if (sectionItem.section === item.section) {
      switch (item.sectionType) {
        case "hero":
          return (
            <Suspense
              fallback={this._renderLoadingSection()}
              key={String(index)}
            >
              <SectionHeroLazy
                item={item}
                onEndReached={this._loadmoreSection}
              />
            </Suspense>
          );
        case "default":
          return (
            <Suspense
              fallback={this._renderLoadingSection()}
              key={String(index)}
            >
              <SectionDefaultLazy
                item={item}
                onEndReached={this._loadmoreSection}
              />
            </Suspense>
          );
        case "textBox":
          return (
            <Suspense
              fallback={this._renderLoadingSection()}
              key={String(index)}
            >
              <SectionTextBoxLazy
                item={item}
                onEndReached={this._loadmoreSection}
              />
            </Suspense>
          );

        case "standard":
          return (
            <Suspense
              fallback={this._renderLoadingSection()}
              key={String(index)}
            >
              <SectionStandardLazy
                item={item}
                onEndReached={this._loadmoreSection}
              />
            </Suspense>
          );

        case "sliderStandard":
          return (
            <Suspense
              fallback={this._renderLoadingSection()}
              key={String(index)}
            >
              <SectionSliderStandardLazy
                item={item}
                onEndReached={this._loadmoreSection}
              />
            </Suspense>
          );

        case "defaultHasPhoneSlider":
          return (
            <Suspense
              fallback={this._renderLoadingSection()}
              key={String(index)}
            >
              <SectionTextAndSlidePhoneLazy
                item={item}
                onEndReached={this._loadmoreSection}
              />
            </Suspense>
          );

        default:
          return null;
      }
    }
    return null;
  };

  // ────────────────────────────────────────────────────────────────────────────────
  _renderSections = (sectionItem: Object): Function => {
    if (!sectionItem || isEmpty(sectionItem)) {
      return null;
    }
    const { homePage }: Props = this.props;
    const { homeSections }: Reducer = homePage;
    return homeSections.map(this._renderSectionItemSwithCase(sectionItem));
  };

  // ────────────────────────────────────────────────────────────────────────────────
  _renderLoadingSection = (): React$Node => {
    return (
      <div className="wil-container">
        <div style={{ padding: "50px 0", textAlign: "center" }}>
          <SpinnerLoadding />
        </div>
      </div>
    );
  };

  // ────────────────────────────────────────────────────────────────────────────────
  _renderMainSection = (item: string, index: number): React$Node => {
    return <div key={String(index)}>{this._renderSections(item)}</div>;
  };

  // ────────────────────────────────────────────────────────────────────────────────
  render(): React$Node {
    const { isLoadding }: State = this.state;
    const { homePage }: Props = this.props;
    const { homeSectionIndex }: Reducer = homePage;

    return (
      <div>
        {homeSectionIndex &&
          !isEmpty(homeSectionIndex) &&
          homeSectionIndex.map(this._renderMainSection)}
        {!!isLoadding && this._renderLoadingSection()}
      </div>
    );
  }
}
