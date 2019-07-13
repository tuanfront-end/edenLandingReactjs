// @flow
import React from "react";
import { Location } from "@reach/router";

let scrollPositions: Object = {};

type Props = {
  location: any
};

class ManageScroll extends React.Component<Props> {
  componentDidMount(): void {
    try {
      // session storage will throw for a few reasons
      // - user settings
      // - in-cognito/private browsing
      // - who knows...
      const getSessionStorage: string =
        sessionStorage.getItem("scrollPositions") || "";
      const storage: any = !!getSessionStorage
        ? JSON.parse(getSessionStorage)
        : false;
      if (storage) {
        scrollPositions = JSON.parse(storage) || {};
        const { location }: Props = this.props;
        const { key }: $PropertyType<Props, "location"> = location;
        if (scrollPositions[key]) {
          window.scrollTo(0, scrollPositions[key]);
        }
      }
    } catch (err) {
      // empty
    }

    window.addEventListener("scroll", this.listener);
  }

  componentDidUpdate(): void {
    const { location }: Props = this.props;
    const { key }: $PropertyType<Props, "location"> = location;
    if (!scrollPositions[key]) {
      // never seen this location before
      window.scrollTo(0, 0);
    } else {
      // seen it
      window.scrollTo(0, scrollPositions[key]);
    }
  }

  componentWillUnmount(): void {
    window.removeEventListener("scroll", this.listener);
  }

  listener = (): void => {
    const { location }: Props = this.props;
    scrollPositions[location.key] = window.scrollY;
    try {
      sessionStorage.setItem(
        "scrollPositions",
        JSON.stringify(scrollPositions)
      );
    } catch (err) {
      console.log(err);
    }
  };

  render(): any {
    return null;
  }
}

function ManageScrollReachRouter(): React$Node {
  return (
    <Location>
      {({ location }: any): any => <ManageScroll location={location} />}
    </Location>
  );
}

export default ManageScrollReachRouter;
