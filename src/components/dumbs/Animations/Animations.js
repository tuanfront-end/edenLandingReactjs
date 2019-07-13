// @flow
import React, { Component } from "react";
import { isEmpty } from "ramda";
import AnimationCircle from "../AnimationCircle/AnimationCircle";
import AnimationSquares from "../AnimationSquares/AnimationSquares";

type Props = {
  data: Array<Object>
};

export default class Animations extends Component<Props> {
  static defaultProps = {
    data: [
      {
        type: "",
        position: ""
      }
    ]
  };

  _renderAnimation = (animationsData: Object): any => {
    if (!animationsData || isEmpty(animationsData)) {
      return null;
    }

    const animations: Array<string> = animationsData.reduce(
      (arr: Array<any>, item: Object): any => {
        return [
          ...arr,
          ...(item.type === "squares"
            ? [<AnimationSquares key={1} position={item.position} />]
            : []),
          ...(item.type === "circle"
            ? [<AnimationCircle key={2} position={item.position} />]
            : [])
        ];
      },
      []
    );
    return animations;
  };

  render(): React$Node {
    const { data }: Props = this.props;
    return <div>{this._renderAnimation(data)}</div>;
  }
}
