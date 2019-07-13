// @flow
import React, { Component } from "react";
import { isEmpty } from "ramda";
import TextBox2 from "../TextBox2/TextBox2";
import TextBox3 from "../TextBox3/TextBox3";
import TextBox4 from "../TextBox4/TextBox4";

type Props = {
  data: Array<Object>,
  type: "textBox2" | "textBox3" | "textBox4"
};

export default class ThreeTextBox extends Component<Props> {
  static defaultProps = {
    data: [],
    type: "textBox2"
  };

  _renderTextBoxIndexFisrt = (): React$Node => {
    const { data, type }: Props = this.props;
    return (
      <div>
        {type === "textBox2" && <TextBox2 data={data[0]} />}
        {type === "textBox3" && <TextBox3 data={data[0]} />}
        {type === "textBox4" && <TextBox4 data={data[0]} />}
      </div>
    );
  };

  _renderTextBoxIndexSecondAndThree = (): React$Node => {
    const { data, type }: Props = this.props;
    return (
      <div>
        {type === "textBox2" && (
          <div>
            <TextBox2 data={data[1]} />
            <TextBox2 data={data[2]} />
          </div>
        )}
        {type === "textBox3" && (
          <div>
            <TextBox3 data={data[1]} />
            <TextBox3 data={data[2]} />
          </div>
        )}
        {type === "textBox4" && (
          <div>
            <TextBox4 data={data[1]} />
            <TextBox4 data={data[2]} />
          </div>
        )}
      </div>
    );
  };

  render(): React$Node {
    const { data }: Props = this.props;
    if (!data || isEmpty(data)) {
      return null;
    }
    return (
      <div className="">
        <div className="wil-row items-center">
          <div className="wil-col-xs-12 wil-col-sm-6 wil-col-md-6">
            {this._renderTextBoxIndexFisrt()}
          </div>
          <div className="wil-col-xs-12 wil-col-sm-6 wil-col-md-6">
            {this._renderTextBoxIndexSecondAndThree()}
          </div>
        </div>
      </div>
    );
  }
}
