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
  getAppSectionIndexAction: Function,
  getNewAppSectionAction: Function,
  appPage: Object
};
type State = {
  isLoadding: boolean
};

type Reducer = {
  appSections: Array<Object>,
  appSectionIndex: Array<string>
};

export default class AppPage extends Component<Props, State> {
  state = {
    isLoadding: false
  };

  // ────────────────────────────────────────────────────────────────────────────────
  async componentDidMount(): Promise<void> {
    const { data }: Object = await axios.get("app");
    const { getAppSectionIndexAction }: Props = this.props;
    await getAppSectionIndexAction(data.data);
  }

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
    const { appPage }: Props = this.props;
    const { appSections }: Reducer = appPage;
    return appSections.map(this._renderSectionItemSwithCase(sectionItem));
  };

  // ────────────────────────────────────────────────────────────────────────────────
  _checkSectionIsExits = (onNextSection: string): any => {
    const { appPage }: Props = this.props;
    const { appSections }: Reducer = appPage;
    const isExits: Array<Object> = appSections.filter(
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
    const { getNewAppSectionAction }: Props = this.props;
    await getNewAppSectionAction(onNextSection);
    this.setState({
      isLoadding: false
    });
    return null;
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
  _renderMainSection = (item: string, index: number): any => {
    return <div key={String(index)}>{this._renderSections(item)}</div>;
  };

  // ────────────────────────────────────────────────────────────────────────────────
  render(): React$Node {
    const { isLoadding }: State = this.state;
    const { appPage }: Props = this.props;
    const { appSectionIndex }: Reducer = appPage;

    return (
      <div>
        {appSectionIndex &&
          !isEmpty(appSectionIndex) &&
          appSectionIndex.map(this._renderMainSection)}
        {!!isLoadding && this._renderLoadingSection()}
      </div>
    );
  }
}
